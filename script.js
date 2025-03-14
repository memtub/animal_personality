// Initialize webcam
async function initWebcam() {
    const video = document.getElementById('webcam-bg');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'user',
                width: { ideal: window.innerWidth },
                height: { ideal: window.innerHeight }
            } 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Error accessing webcam:", err);
        // If webcam fails, set a fallback background color
        document.body.style.backgroundColor = "#000";
    }
}

// Handle Begin Button Click
function handleBeginClick() {
    const splashScreen = document.getElementById('splash-screen');
    const testContent = document.getElementById('test-content');
    
    // Fade out splash screen
    splashScreen.style.opacity = '0';
    splashScreen.style.transition = 'opacity 0.5s ease';
    
    // After fade out, hide splash and show test
    setTimeout(() => {
        splashScreen.style.display = 'none';
        testContent.style.display = 'block';
        
        // Fade in test content
        setTimeout(() => {
            testContent.style.opacity = '1';
        }, 50);
    }, 500);
}

// Personality Test Configuration
const personalityTest = {
    questions: [
        {
            imageSrc: "question1.png",
            options: [
                {
                    text: "Peaceful natural settings like forests or mountains",
                    points: 2
                },
                {
                    text: "Bustling urban environments with lots of activity",
                    points: 1
                }
            ]
        },
        {
            imageSrc: "question2.png",
            options: [
                {
                    text: "Exploring and trying new experiences",
                    points: 2
                },
                {
                    text: "Staying close to home and maintaining routine",
                    points: 1
                }
            ]
        },
        {
            imageSrc: "question3.png",
            options: [
                {
                    text: "Independent and self-reliant",
                    points: 2
                },
                {
                    text: "Social and team-oriented",
                    points: 1
                }
            ]
        },
        {
            imageSrc: "question4.png",
            options: [
                {
                    text: "Tackle them head-on with determination",
                    points: 2
                },
                {
                    text: "Seek advice and collaborate with others",
                    points: 1
                }
            ]
        },
        {
            imageSrc: "question5.png",
            options: [
                {
                    text: "High energy, always ready for action",
                    points: 2
                },
                {
                    text: "Steady and consistent energy",
                    points: 1
                }
            ]
        },
        {
            imageSrc: "question6.png",
            options: [
                {
                    text: "Always excited to explore the unknown",
                    points: 2
                },
                {
                    text: "Prefer planned and predictable experiences",
                    points: 1
                }
            ]
        }
    ],
    currentQuestion: 0,
    totalPoints: 0,
    // Define ranges for different animals
    animalRanges: {
        flamingo: { min: 10, max: 12 }, // Highest score range
        dolphin: { min: 8, max: 9 },
        leopard: { min: 6, max: 7 },
        owl: { min: 4, max: 5 },
        otter: { min: 2, max: 3 },
        turtle: { min: 0, max: 1 }  // Lowest score range
    },
    animalLinks: {
        flamingo: "https://lmm3r.zappar-us.io/5952456002419544077/",
        dolphin: "https://lmm3r.zappar-us.io/7325964464575150411/",
        leopard: "https://lmm3r.zappar-us.io/908934108303348339/",
        owl: "https://lmm3r.zappar-us.io/6598654083829991948/",
        otter: "https://lmm3r.zappar-us.io/6919894415709339263/",
        turtle: "https://lmm3r.zappar-us.io/2856010903023695836/"
    }
};

// DOM Elements
const questionImage = document.getElementById('question-image');
const optionButtons = document.querySelectorAll('.option-button');
const progressBar = document.getElementById('progress-bar');

// Update Question
function updateQuestion() {
    const current = personalityTest.questions[personalityTest.currentQuestion];
    
    // Update question image
    questionImage.src = current.imageSrc;
    questionImage.alt = `Question ${personalityTest.currentQuestion + 1}`;
    
    // Update button texts
    optionButtons.forEach((button, index) => {
        button.textContent = current.options[index].text;
        button.dataset.points = current.options[index].points;
    });

    // Update progress bar
    const progress = (personalityTest.currentQuestion / personalityTest.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Handle Option Selection
function handleOptionSelection(event) {
    // Add points to total
    personalityTest.totalPoints += parseInt(event.target.dataset.points);
    
    personalityTest.currentQuestion++;
    
    if (personalityTest.currentQuestion < personalityTest.questions.length) {
        updateQuestion();
    } else {
        // Set progress bar to 100% on completion
        progressBar.style.width = '100%';
        determineResult();
    }
}

// Determine Final Result
function determineResult() {
    // Find the animal based on the total points
    let resultAnimal = 'turtle'; // Default to lowest range
    for (const [animal, range] of Object.entries(personalityTest.animalRanges)) {
        if (personalityTest.totalPoints >= range.min && personalityTest.totalPoints <= range.max) {
            resultAnimal = animal;
            break;
        }
    }
    
    // Get the corresponding filter link and redirect
    const filterLink = personalityTest.animalLinks[resultAnimal];
    window.location.href = filterLink;
}

// Initialize Test
function initTest() {
    updateQuestion();
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionSelection);
    });
}

// Start the test when page loads
window.addEventListener('load', () => {
    initWebcam();
    // Add begin button listener
    document.getElementById('begin-button').addEventListener('click', handleBeginClick);
    // Initialize test (but don't show it yet)
    initTest();
});