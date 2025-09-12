// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherCollaborateAI is SepoliaConfig {
    using FHE for *;
    
    struct Dataset {
        euint32 datasetId;
        euint32 size;
        euint32 quality;
        euint32 contributorCount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        string category;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Contribution {
        euint32 contributionId;
        euint32 datasetId;
        euint32 dataSize;
        euint32 qualityScore;
        address contributor;
        uint256 timestamp;
        string metadataHash;
    }
    
    struct TrainingSession {
        euint32 sessionId;
        euint32 datasetId;
        euint32 modelAccuracy;
        euint32 trainingTime;
        bool isCompleted;
        bool isVerified;
        address trainer;
        uint256 startTime;
        uint256 endTime;
        string modelHash;
    }
    
    struct Reward {
        euint32 rewardId;
        euint32 amount;
        address recipient;
        uint256 timestamp;
        string reason;
    }
    
    mapping(uint256 => Dataset) public datasets;
    mapping(uint256 => Contribution) public contributions;
    mapping(uint256 => TrainingSession) public trainingSessions;
    mapping(uint256 => Reward) public rewards;
    mapping(address => euint32) public contributorReputation;
    mapping(address => euint32) public trainerReputation;
    mapping(address => euint32) public totalRewards;
    
    uint256 public datasetCounter;
    uint256 public contributionCounter;
    uint256 public sessionCounter;
    uint256 public rewardCounter;
    
    address public owner;
    address public verifier;
    
    event DatasetCreated(uint256 indexed datasetId, address indexed owner, string name);
    event ContributionMade(uint256 indexed contributionId, uint256 indexed datasetId, address indexed contributor);
    event TrainingSessionStarted(uint256 indexed sessionId, uint256 indexed datasetId, address indexed trainer);
    event TrainingSessionCompleted(uint256 indexed sessionId, bool success);
    event RewardDistributed(uint256 indexed rewardId, address indexed recipient, string reason);
    event DatasetVerified(uint256 indexed datasetId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createDataset(
        string memory _name,
        string memory _description,
        string memory _category,
        externalEuint32 size,
        externalEuint32 quality,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Dataset name cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        
        uint256 datasetId = datasetCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalSize = FHE.fromExternal(size, inputProof);
        euint32 internalQuality = FHE.fromExternal(quality, inputProof);
        
        datasets[datasetId] = Dataset({
            datasetId: FHE.asEuint32(0), // Will be set properly later
            size: internalSize,
            quality: internalQuality,
            contributorCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            category: _category,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit DatasetCreated(datasetId, msg.sender, _name);
        return datasetId;
    }
    
    function contributeToDataset(
        uint256 datasetId,
        externalEuint32 dataSize,
        externalEuint32 qualityScore,
        string memory metadataHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(datasets[datasetId].owner != address(0), "Dataset does not exist");
        require(datasets[datasetId].isActive, "Dataset is not active");
        
        uint256 contributionId = contributionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalDataSize = FHE.fromExternal(dataSize, inputProof);
        euint32 internalQualityScore = FHE.fromExternal(qualityScore, inputProof);
        
        contributions[contributionId] = Contribution({
            contributionId: FHE.asEuint32(0), // Will be set properly later
            datasetId: FHE.asEuint32(datasetId),
            dataSize: internalDataSize,
            qualityScore: internalQualityScore,
            contributor: msg.sender,
            timestamp: block.timestamp,
            metadataHash: metadataHash
        });
        
        // Update dataset contributor count
        datasets[datasetId].contributorCount = FHE.add(datasets[datasetId].contributorCount, FHE.asEuint32(1));
        datasets[datasetId].updatedAt = block.timestamp;
        
        emit ContributionMade(contributionId, datasetId, msg.sender);
        return contributionId;
    }
    
    function startTrainingSession(
        uint256 datasetId,
        string memory modelHash
    ) public returns (uint256) {
        require(datasets[datasetId].owner != address(0), "Dataset does not exist");
        require(datasets[datasetId].isActive, "Dataset is not active");
        require(datasets[datasetId].isVerified, "Dataset must be verified");
        
        uint256 sessionId = sessionCounter++;
        
        trainingSessions[sessionId] = TrainingSession({
            sessionId: FHE.asEuint32(0), // Will be set properly later
            datasetId: FHE.asEuint32(datasetId),
            modelAccuracy: FHE.asEuint32(0),
            trainingTime: FHE.asEuint32(0),
            isCompleted: false,
            isVerified: false,
            trainer: msg.sender,
            startTime: block.timestamp,
            endTime: 0,
            modelHash: modelHash
        });
        
        emit TrainingSessionStarted(sessionId, datasetId, msg.sender);
        return sessionId;
    }
    
    function completeTrainingSession(
        uint256 sessionId,
        externalEuint32 modelAccuracy,
        externalEuint32 trainingTime,
        bytes calldata inputProof
    ) public {
        require(trainingSessions[sessionId].trainer == msg.sender, "Only trainer can complete session");
        require(!trainingSessions[sessionId].isCompleted, "Session already completed");
        
        // Convert external encrypted values to internal
        euint32 internalAccuracy = FHE.fromExternal(modelAccuracy, inputProof);
        euint32 internalTrainingTime = FHE.fromExternal(trainingTime, inputProof);
        
        trainingSessions[sessionId].modelAccuracy = internalAccuracy;
        trainingSessions[sessionId].trainingTime = internalTrainingTime;
        trainingSessions[sessionId].isCompleted = true;
        trainingSessions[sessionId].endTime = block.timestamp;
        
        emit TrainingSessionCompleted(sessionId, true);
    }
    
    function distributeReward(
        address recipient,
        externalEuint32 amount,
        string memory reason,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can distribute rewards");
        require(recipient != address(0), "Invalid recipient address");
        
        uint256 rewardId = rewardCounter++;
        
        // Convert external encrypted value to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        rewards[rewardId] = Reward({
            rewardId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            recipient: recipient,
            timestamp: block.timestamp,
            reason: reason
        });
        
        // Update total rewards for recipient
        totalRewards[recipient] = FHE.add(totalRewards[recipient], internalAmount);
        
        emit RewardDistributed(rewardId, recipient, reason);
    }
    
    function verifyDataset(uint256 datasetId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify datasets");
        require(datasets[datasetId].owner != address(0), "Dataset does not exist");
        
        datasets[datasetId].isVerified = isVerified;
        emit DatasetVerified(datasetId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation, bool isTrainer) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (isTrainer) {
            trainerReputation[user] = reputation;
        } else {
            contributorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getDatasetInfo(uint256 datasetId) public view returns (
        string memory name,
        string memory description,
        string memory category,
        uint8 size,
        uint8 quality,
        uint8 contributorCount,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Dataset storage dataset = datasets[datasetId];
        return (
            dataset.name,
            dataset.description,
            dataset.category,
            0, // FHE.decrypt(dataset.size) - will be decrypted off-chain
            0, // FHE.decrypt(dataset.quality) - will be decrypted off-chain
            0, // FHE.decrypt(dataset.contributorCount) - will be decrypted off-chain
            dataset.isActive,
            dataset.isVerified,
            dataset.owner,
            dataset.createdAt,
            dataset.updatedAt
        );
    }
    
    function getContributionInfo(uint256 contributionId) public view returns (
        uint8 dataSize,
        uint8 qualityScore,
        address contributor,
        uint256 timestamp,
        string memory metadataHash
    ) {
        Contribution storage contribution = contributions[contributionId];
        return (
            0, // FHE.decrypt(contribution.dataSize) - will be decrypted off-chain
            0, // FHE.decrypt(contribution.qualityScore) - will be decrypted off-chain
            contribution.contributor,
            contribution.timestamp,
            contribution.metadataHash
        );
    }
    
    function getTrainingSessionInfo(uint256 sessionId) public view returns (
        uint8 modelAccuracy,
        uint8 trainingTime,
        bool isCompleted,
        bool isVerified,
        address trainer,
        uint256 startTime,
        uint256 endTime,
        string memory modelHash
    ) {
        TrainingSession storage session = trainingSessions[sessionId];
        return (
            0, // FHE.decrypt(session.modelAccuracy) - will be decrypted off-chain
            0, // FHE.decrypt(session.trainingTime) - will be decrypted off-chain
            session.isCompleted,
            session.isVerified,
            session.trainer,
            session.startTime,
            session.endTime,
            session.modelHash
        );
    }
    
    function getContributorReputation(address contributor) public view returns (uint8) {
        return 0; // FHE.decrypt(contributorReputation[contributor]) - will be decrypted off-chain
    }
    
    function getTrainerReputation(address trainer) public view returns (uint8) {
        return 0; // FHE.decrypt(trainerReputation[trainer]) - will be decrypted off-chain
    }
    
    function getTotalRewards(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(totalRewards[user]) - will be decrypted off-chain
    }
}