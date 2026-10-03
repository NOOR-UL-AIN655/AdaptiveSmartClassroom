function adaptClassroom() {

    const subject = document.getElementById("subject").value;
    const level = document.getElementById("level").value;
    const mode = document.getElementById("mode").value;
    const time = document.getElementById("time").value;

    const result = document.getElementById("result");

    // Check all selections
    if (!subject || !level || !mode || !time) {
        result.innerHTML = `
            <div class="message">
                Please select all options first.
            </div>
        `;
        return;
    }

    // Subject name
    let subjectName;

    if (subject === "ai") {
        subjectName = "Artificial Intelligence";
    }
    else if (subject === "programming") {
        subjectName = "Programming";
    }
    else {
        subjectName = "Mathematics";
    }

    // Level name
    let levelName =
        level.charAt(0).toUpperCase() + level.slice(1);

    // Learning mode
    let modeName =
        mode.charAt(0).toUpperCase() + mode.slice(1);

    // ADAPTIVE TOPICS
    let topics = [];

    if (subject === "ai") {

        if (level === "beginner") {
            topics = [
                "Introduction to Artificial Intelligence",
                "Types of AI",
                "Basic Machine Learning"
            ];
        }
        else if (level === "intermediate") {
            topics = [
                "Supervised Learning",
                "Unsupervised Learning",
                "Model Evaluation"
            ];
        }
        else {
            topics = [
                "Deep Learning",
                "Neural Networks",
                "Advanced AI Models"
            ];
        }

    }
    else if (subject === "programming") {

        if (level === "beginner") {
            topics = [
                "Variables",
                "Conditions",
                "Loops"
            ];
        }
        else if (level === "intermediate") {
            topics = [
                "Functions",
                "Object-Oriented Programming",
                "APIs"
            ];
        }
        else {
            topics = [
                "Design Patterns",
                "System Design",
                "Performance Optimization"
            ];
        }

    }
    else {

        if (level === "beginner") {
            topics = [
                "Basic Algebra",
                "Fractions",
                "Percentages"
            ];
        }
        else if (level === "intermediate") {
            topics = [
                "Equations",
                "Functions",
                "Probability"
            ];
        }
        else {
            topics = [
                "Calculus",
                "Linear Algebra",
                "Advanced Probability"
            ];
        }
    }

    // ADAPTIVE TIME
    let studyPlan;

    if (time === "30") {
        studyPlan = `
            <strong>30-Minute Plan:</strong>
            Focus on one main topic and complete a short activity.
        `;
    }
    else if (time === "60") {
        studyPlan = `
            <strong>1-Hour Plan:</strong>
            Spend 30 minutes learning and 30 minutes practicing.
        `;
    }
    else {
        studyPlan = `
            <strong>2+ Hour Plan:</strong>
            Study multiple topics, complete activities, and review your progress.
        `;
    }

    // ADAPTIVE LEARNING MODE
    let modeMessage;

    if (mode === "notes") {
        modeMessage = `
            Read the key concepts and important points carefully.
        `;
    }
    else if (mode === "video") {
        modeMessage = `
            Watch the lesson video and pause when you need more time to understand a concept.
        `;
    }
    else {
        modeMessage = `
            Test your knowledge with questions and use your mistakes to improve.
        `;
    }

    // ADAPTIVE DIFFICULTY
    let difficulty;
    let difficultyText;

    if (level === "beginner") {
        difficulty = "Easy";
        difficultyText =
            "The classroom will focus on simple concepts and examples.";
    }
    else if (level === "intermediate") {
        difficulty = "Moderate";
        difficultyText =
            "The classroom will include concepts, practice, and problem solving.";
    }
    else {
        difficulty = "Challenging";
        difficultyText =
            "The classroom will focus on advanced concepts and complex problems.";
    }

    // DISPLAY ADAPTIVE CLASSROOM
    result.innerHTML = `
        <div class="result-card">

            <h2>Your Adaptive Classroom Plan</h2>

            <p>
                <strong>Subject:</strong> ${subjectName}
            </p>

            <p>
                <strong>Learning Level:</strong> ${levelName}
            </p>

            <p>
                <strong>Learning Mode:</strong> ${modeName}
            </p>

            <p>
                <strong>Available Time:</strong> ${time} minutes
            </p>

            <p>
                <strong>Difficulty:</strong> ${difficulty}
            </p>

            <p>
                ${difficultyText}
            </p>

            <h3>Recommended Topics</h3>

            <ul>
                ${topics.map(topic => `<li>${topic}</li>`).join("")}
            </ul>

            <h3>Study Plan</h3>

            <p>
                ${studyPlan}
            </p>

            <h3>Learning Approach</h3>

            <p>
                ${modeMessage}
            </p>

        </div>
    `;
}

function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const voiceStatus =
        document.getElementById("voiceStatus");

    if (!SpeechRecognition) {
        voiceStatus.textContent =
            "Voice input is not supported in this browser.";
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceStatus.textContent = "🎤 Listening...";

    recognition.start();

    recognition.onresult = function(event) {

        const spokenText =
            event.results[0][0].transcript.toLowerCase();

        voiceStatus.textContent =
            "You said: " + spokenText;

        // Detect Subject
        if (
            spokenText.includes("artificial intelligence") ||
            spokenText.includes("ai")
        ) {
            document.getElementById("subject").value = "ai";
        }
        else if (spokenText.includes("programming")) {
            document.getElementById("subject").value = "programming";
        }
        else if (
            spokenText.includes("mathematics") ||
            spokenText.includes("math")
        ) {
            document.getElementById("subject").value = "math";
        }

        // Detect Learning Level
        if (spokenText.includes("beginner")) {
            document.getElementById("level").value = "beginner";
        }
        else if (spokenText.includes("intermediate")) {
            document.getElementById("level").value = "intermediate";
        }
        else if (spokenText.includes("advanced")) {
            document.getElementById("level").value = "advanced";
        }

        // Detect Learning Mode
        if (spokenText.includes("notes")) {
            document.getElementById("mode").value = "notes";
        }
        else if (spokenText.includes("video")) {
            document.getElementById("mode").value = "video";
        }
        else if (spokenText.includes("quiz")) {
            document.getElementById("mode").value = "quiz";
        }

        // Detect Available Time
        if (
            spokenText.includes("30") ||
            spokenText.includes("thirty")
        ) {
            document.getElementById("time").value = "30";
        }
        else if (
            spokenText.includes("60") ||
            spokenText.includes("sixty") ||
            spokenText.includes("one hour")
        ) {
            document.getElementById("time").value = "60";
        }
        else if (
            spokenText.includes("120") ||
            spokenText.includes("two hours") ||
            spokenText.includes("2 hours")
        ) {
            document.getElementById("time").value = "120";
        }

        voiceStatus.textContent =
            "✅ Voice input applied!";

        // Automatically create adaptive plan
        adaptClassroom();
    };

    recognition.onerror = function(event) {

        voiceStatus.textContent =
            "❌ Voice input error: " + event.error;
    };

    recognition.onend = function() {

        if (voiceStatus.textContent === "🎤 Listening...") {
            voiceStatus.textContent =
                "Voice input ended. Please try again.";
        }
    };
}


function startHandGesture() {

    const video = document.getElementById("gestureVideo");
    const status = document.getElementById("gestureStatus");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {

            video.srcObject = stream;
            video.style.display = "block";

            status.textContent =
                "✋ Camera started. Show your hand to the camera.";

            video.onloadeddata = function() {

                if (!video.dataset.cameraStarted) {
                    video.dataset.cameraStarted = "true";
                const camera = new Camera(video, {
                    onFrame: async function() {
                        await hands.send({ image: video });
                    },
                    width: 640,
                    height: 480
                });
                camera.start();
            }
        };

        })
        .catch(function(error) {

            status.textContent =
                "❌ Camera access denied or unavailable.";

            console.error(error);
        });
}



const hands = new Hands({
    locateFile: function(file) {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

let lastGestureTime = 0;

hands.onResults(function(results) {

    console.log("MediaPipe is receiving frames");
    const status = document.getElementById("gestureStatus");
    
    const currentTime = Date.now();

    if (currentTime - lastGestureTime < 1500) {
        return;
    }

    if (
        results.multiHandLandmarks &&
        results.multiHandLandmarks.length > 0
    ) {

        const landmarks = results.multiHandLandmarks[0];
        // Thumb
        const thumbTip = landmarks[4];
        const thumbIP = landmarks[3];
        const indexMCP = landmarks[5];
        const middleMCP = landmarks[9];

        const fingersFolded =
        landmarks[8].y > landmarks[6].y &&
        landmarks[12].y > landmarks[10].y &&
        landmarks[16].y > landmarks[14].y &&
        landmarks[20].y > landmarks[18].y;

        const thumbUp =
        thumbTip.y < thumbIP.y &&
        thumbTip.y < indexMCP.y &&
        thumbTip.y < middleMCP.y &&
        fingersFolded;

        let fingerCount = 0;

        
        if (Math.abs(thumbTip.x - landmarks[0].x) >
        Math.abs(thumbIP.x - landmarks[0].x)) {
            fingerCount++;
        }

        // Index finger
        if (landmarks[8].y < landmarks[6].y) {
            fingerCount++;
        }

        // Middle finger
        if (landmarks[12].y < landmarks[10].y) {
            fingerCount++;
        }

        // Ring finger
        if (landmarks[16].y < landmarks[14].y) {
            fingerCount++;
        }

        // Little finger
        if (landmarks[20].y < landmarks[18].y) {
            fingerCount++;
        }

        if (thumbUp) {

            status.textContent =
            "👍 Thumbs Up — CONFIRM";

            confirmSelection();

            lastGestureTime = Date.now();
        }

        else if (fingerCount === 1) {
            status.textContent =
                "☝️ One Finger Detected";
            nextTopic();
            lastGestureTime = Date.now();
        }
        
        else if (fingerCount === 2) {
            status.textContent =
                "✌️ Two Fingers Detected";
            previousTopic();
            lastGestureTime = Date.now();
        }
        else if (fingerCount === 3) {
            status.textContent =
                "🤟 Three Fingers Detected";
        }
        else if (fingerCount === 0) {

            status.textContent =
            "👍 Thumbs Up — CONFIRMED";

            confirmSelection();
        }
        else if (fingerCount === 4) {
            status.textContent =
                "🖐️ Open Palm — PAUSE";

            pauseClassroom();
            lastGestureTime = Date.now();
        }
        else {
            status.textContent =
                "✋ Open Palm Detected";
        }

    } else {

        status.textContent =
            "Show your hand to the camera.";

    }
});

function stopHandGesture() {

    const video = document.getElementById("gestureVideo");
    const status = document.getElementById("gestureStatus");

    if (video.srcObject) {

        const tracks = video.srcObject.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        video.srcObject = null;
    }

    video.style.display = "none";
    video.dataset.cameraStarted = "false";

    status.textContent =
        "🛑 Hand gesture camera stopped.";
}

function nextTopic() {

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="message">
            ➡️ Next Topic selected!
        </div>
    `;
}function nextTopic() {

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="message">
            ➡️ Next Topic selected!
        </div>
    `;
}
function previousTopic() {

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="message">
            ⬅️ Previous Topic selected!
        </div>
    `;
}

function confirmSelection() {

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="message">
            👍 Selection Confirmed!
        </div>
    `;
}

function pauseClassroom() {

    const result = document.getElementById("result");

    result.innerHTML = `
        <div class="message">
            🖐️ Classroom Paused
        </div>
    `;
}