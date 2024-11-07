// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct VotingSession {
        string title; // Title of the voting session
        address creator; // Creator of the voting session
        uint256 votingStart;
        uint256 votingEnd;
        Candidate[] candidates;
        mapping(address => bool) voters; // Track voters per session
        bool isActive; // Track if session is still active
    }

    VotingSession[] public votingSessions;

    event VotingSessionCreated(
        uint256 sessionId,
        string title,
        address creator,
        uint256 votingEnd
    );
    event VoteCast(uint256 sessionId, uint256 candidateIndex, address voter);

    // Modifier to check if the session is active
    modifier sessionActive(uint256 sessionId) {
        require(
            block.timestamp >= votingSessions[sessionId].votingStart &&
                block.timestamp < votingSessions[sessionId].votingEnd,
            "Voting session is not active"
        );
        _;
    }

    // Create a new voting session
    function createVotingSession(
        string memory _title,
        string[] memory _candidateNames,
        uint256 _durationInMinutes
    ) public {
        require(_candidateNames.length > 0, "Must have at least one candidate");

        VotingSession storage newSession = votingSessions.push();
        newSession.title = _title;
        newSession.creator = msg.sender;
        newSession.votingStart = block.timestamp;
        newSession.votingEnd =
            block.timestamp +
            (_durationInMinutes * 1 minutes);
        newSession.isActive = true;

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            newSession.candidates.push(
                Candidate({name: _candidateNames[i], voteCount: 0})
            );
        }

        emit VotingSessionCreated(
            votingSessions.length - 1,
            _title,
            msg.sender,
            newSession.votingEnd
        );
    }

    function hasVoted(
        uint256 sessionId,
        address voter
    ) public view returns (bool) {
        VotingSession storage session = votingSessions[sessionId];
        return session.voters[voter];
    }

    // Vote for a candidate in a specific voting session
    function vote(
        uint256 sessionId,
        uint256 candidateIndex
    ) public sessionActive(sessionId) {
        VotingSession storage session = votingSessions[sessionId];
        require(
            !session.voters[msg.sender],
            "You have already voted in this session."
        );
        require(
            candidateIndex < session.candidates.length,
            "Invalid candidate index."
        );

        session.candidates[candidateIndex].voteCount++;
        session.voters[msg.sender] = true;

        emit VoteCast(sessionId, candidateIndex, msg.sender);
    }

    // Function to get the title of a voting session by its ID
    function getVotingSessionTitle(
        uint256 sessionId
    ) public view returns (string memory) {
        require(sessionId < votingSessions.length, "Invalid session ID.");
        return votingSessions[sessionId].title;
    }

    // Get current results of candidates during an active voting session
    function getResults(
        uint256 sessionId
    ) public view returns (Candidate[] memory) {
        require(sessionId < votingSessions.length, "Invalid session ID.");

        return votingSessions[sessionId].candidates;
    }

    // Check if a voting session is active
    function isVotingActive(uint256 sessionId) public view returns (bool) {
        VotingSession storage session = votingSessions[sessionId];
        return (block.timestamp >= session.votingStart &&
            block.timestamp < session.votingEnd);
    }

    // Get remaining time for a voting session
    function getRemainingTime(uint256 sessionId) public view returns (uint256) {
        VotingSession storage session = votingSessions[sessionId];
        if (block.timestamp >= session.votingEnd) {
            return 0;
        }
        return session.votingEnd - block.timestamp;
    }
}
