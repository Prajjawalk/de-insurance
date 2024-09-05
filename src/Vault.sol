//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vault is ERC4626,Ownable{

    using SafeERC20 for IERC20;

    uint256 public claimsResolved;
    uint256 public totalClaims;

    enum PolicyStatus {
      Unclaimed,
      Expired,
      Claimed
    }
    
    // Insurance policy
    struct Policy {
      uint256 id;
      uint256 validityPeriod;
      bytes terms;
      uint256 maxClaim;
      uint256 price;
      uint256 minUnderwriters;
    }

    struct PurchaseDetails {
      uint256 purchaseTimestamp;
      PolicyStatus status;
    }

    struct Claim {
      uint256 policyId;
      uint256 claimAmount;
      bytes claim;
      address claimAccount;
      uint256 totalApprovals;
    }

    // List of policies
    Policy[] public policies;
    address[] public underwriters;
    
    mapping(address => mapping(uint256 => PurchaseDetails)) public userPurchaseDetails;
    mapping(uint256 => Claim) public claims;
    mapping(address => bool) public isUnderwriter;
    // Shares per LP
    mapping(address => uint256) public shareHolders;

    modifier onlyUnderwriter {
        require(isUnderwriter[msg.sender] == true);
        _;
    }

    
    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol
    ) ERC4626(_asset) ERC20(_name, _symbol) Ownable(msg.sender) {}

    
    /*///////////////////////////////////////////////////////////////
                            INSURANCE FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /**
     * 
     * @param _terms policy terms
     * @param _validityPeriod policy renewal timeline
     * @param _maxClaim maximum amount that could be claimed
     * @param _price pricing
     * @param _minUnderwriters minimum underwriters needed for approval
     */
    function createPolicy(bytes memory _terms, uint256 _validityPeriod, uint256 _maxClaim, uint256 _price, uint256 _minUnderwriters) public onlyOwner {
      uint256 policyIndex = policies.length + 1;

      Policy storage policy = policies.push();
      policy.id = policyIndex;
      policy.validityPeriod = _validityPeriod;
      policy.terms = _terms;
      policy.maxClaim = _maxClaim;
      policy.price = _price;
      policy.minUnderwriters = _minUnderwriters;
    }

    function purchasePolicy(uint256 policyIndex) public {
      
      require(policyIndex <= policies.length, "INVALID_POLICY_INDEX");

      // Policy indexing starts from 1
      Policy memory policy = policies[policyIndex - 1];
      IERC20(asset()).safeTransferFrom(msg.sender, address(this), policy.price);
      PurchaseDetails storage purchaseDetails = userPurchaseDetails[msg.sender][policyIndex];
      purchaseDetails.purchaseTimestamp = block.timestamp;
      purchaseDetails.status = PolicyStatus.Unclaimed;
    }

    function fileClaim(uint256 _policyId, uint256 _claimAmount, bytes memory _claim) public {
      Claim memory claim;
      claim.policyId = _policyId;
      claim.claimAmount = _claimAmount;
      claim.claim = _claim;
      claim.claimAccount = msg.sender;
      claim.totalApprovals = 0;

      claims[totalClaims + 1] = claim;
      totalClaims += 1;
    }

    function renewPolicy(uint256 policyId) public {
      Policy memory policy = policies[policyId - 1];
      IERC20(asset()).safeTransferFrom(msg.sender, address(this), policy.price);
      PurchaseDetails storage purchaseDetails = userPurchaseDetails[msg.sender][policyId];
      purchaseDetails.purchaseTimestamp = block.timestamp;
      purchaseDetails.status = PolicyStatus.Unclaimed;
    }

    function attestClaim(uint256 claimIndex) public onlyUnderwriter {
      Claim storage claim = claims[claimIndex];
      claim.totalApprovals += 1;

      Policy memory policy = policies[claim.policyId - 1];

      if((claim.totalApprovals >= policy.minUnderwriters) && (userPurchaseDetails[msg.sender][policy.id].status == PolicyStatus.Unclaimed)) {
        if (block.timestamp - userPurchaseDetails[msg.sender][policy.id].purchaseTimestamp < policy.validityPeriod) {
          if(claim.claimAmount <= policy.price) {
            IERC20(asset()).safeTransfer(claim.claimAccount, policy.price);
          } else {
            if(claim.claimAmount < policy.maxClaim) {
              IERC20(asset()).safeTransfer(claim.claimAccount, claim.claimAmount);
            } else {
              IERC20(asset()).safeTransfer(claim.claimAccount, claim.claimAmount);
            }
          }

          userPurchaseDetails[msg.sender][policy.id].status = PolicyStatus.Claimed;
        } else {
          userPurchaseDetails[msg.sender][policy.id].status = PolicyStatus.Expired;
        }

        claimsResolved += 1;
      }
    }

    function updateUnderwriter(address _underwriter) public onlyOwner {
      require(isUnderwriter[_underwriter] == false, "IS_UNDERWRITER");
      underwriters.push(_underwriter);
      isUnderwriter[_underwriter] = true;
    }

    function getAllPolicies() public view returns (Policy[] memory) {
      return policies;
    }

    function getAllUnderwriters() public view returns (address[] memory) {
      return underwriters;
    }

    /*///////////////////////////////////////////////////////////////
                            LP FUNCTIONS
    //////////////////////////////////////////////////////////////*/
    /**
     * @notice function to deposit assets and receive vault tokens in exchange
     * @param _assets amount of the asset token
     */
    function _deposit(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        shareHolders[msg.sender] = shareHolders[msg.sender] + deposit(_assets, msg.sender);
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares amount of shares the user wants to convert
     * @param _receiver address of the user who will receive the assets
     */
    function _withdraw(uint _shares, address _receiver) public {
        require(_shares > 0, "withdraw must be greater than Zero");
        require(_receiver != address(0), "Zero Address");
        require(shareHolders[msg.sender] >= _shares, "Not enough shares");
        redeem(_shares, _receiver, msg.sender);
        shareHolders[msg.sender] -= _shares;
    }

    /**
     * @notice Returns the total balance of a user
     * @param _user Address of the user
     */
    function totalAssetsOfLP(address _user) public view returns (uint256) {
        return shareHolders[_user];
    }

    function underlyingTokenSymbol() public view returns (string memory) {
      return ERC20(asset()).symbol();
    }

    function _decimalsOffset() internal pure override returns (uint8) {
        return 3;
    }
}