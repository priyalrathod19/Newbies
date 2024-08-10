function predictCrop() {
    // Get input values
    const ph = parseFloat(document.getElementById('ph').value);
    const moisture = parseFloat(document.getElementById('moisture').value);
    const nitrogen = parseFloat(document.getElementById('nitrogen').value);
    const phosphorus = parseFloat(document.getElementById('phosphorus').value);
    const potassium = parseFloat(document.getElementById('potassium').value);

    
    if (isNaN(ph) || ph < 0 || ph > 14) {
        window.alert("The value of pH must be between 0 and 14.");
        return;
    }

    if (isNaN(moisture) || moisture < 0) {
        window.alert("The value of moisture must not be less than 0.");
        return;
    }

    if (isNaN(nitrogen) || nitrogen < 0) {
        window.alert("The value of nitrogen must not be less than 0.");
        return;
    }

    if (isNaN(phosphorus) || phosphorus < 0) {
        window.alert("The value of phosphorus must not be less than 0.");
        return;
    }

    if (isNaN(potassium) || potassium < 0) {
        window.alert("The value of potassium must not be less than 0.");
        return;
    }

    

    // Define ideal conditions for various crops
    const crops = [
        { name: "Corn", ph: [6.0, 7.5], moisture: [25, 30], nitrogen: [20, 40], phosphorus: [20, 30], potassium: [30, 50] },
        { name: "Wheat", ph: [6.0, 7.5], moisture: [20, 30], nitrogen: [15, 30], phosphorus: [15, 25], potassium: [20, 40] },
        { name: "Soybean", ph: [6.0, 7.5], moisture: [15, 25], nitrogen: [10, 25], phosphorus: [10, 20], potassium: [20, 35] },
        { name: "Beans", ph: [5.5, 7.0], moisture: [20, 35], nitrogen: [15, 30], phosphorus: [10, 20], potassium: [15, 30] },
        { name: "Peas", ph: [6.0, 7.0], moisture: [15, 30], nitrogen: [10, 25], phosphorus: [10, 20], potassium: [15, 25] },
    ];

    let bestCrops = [];
    let maxScore = 0;

    // Function to calculate similarity score
    function calculateScore(crop) {

        
        
        let score = 0;

        // Check pH
        if (ph >= crop.ph[0] && ph <= crop.ph[1]) {
            score += 20;
        } else {
            score -= Math.abs((ph - crop.ph[0]) - (crop.ph[1] - ph)) / 2;
        }

        // Check moisture
        if (moisture >= crop.moisture[0] && moisture <= crop.moisture[1]) {
            score += 20;
        } else {
            score -= Math.abs((moisture - crop.moisture[0]) - (crop.moisture[1] - moisture)) / 2;
        }

        // Check nitrogen
        if (nitrogen >= crop.nitrogen[0] && nitrogen <= crop.nitrogen[1]) {
            score += 20;
        } else {
            score -= Math.abs((nitrogen - crop.nitrogen[0]) - (crop.nitrogen[1] - nitrogen)) / 2;
        }

        // Check phosphorus
        if (phosphorus >= crop.phosphorus[0] && phosphorus <= crop.phosphorus[1]) {
            score += 20;
        } else {
            score -= Math.abs((phosphorus - crop.phosphorus[0]) - (crop.phosphorus[1] - phosphorus)) / 2;
        }

        // Check potassium
        if (potassium >= crop.potassium[0] && potassium <= crop.potassium[1]) {
            score += 20;
        } else {
            score -= Math.abs((potassium - crop.potassium[0]) - (crop.potassium[1] - potassium)) / 2;
        }

        return score;
    }

    // Evaluate each crop
    crops.forEach(crop => {
        const score = calculateScore(crop);
        if (score > maxScore) {
            maxScore = score;
            bestCrops = [crop.name];
        } else if (score === maxScore) {
            bestCrops.push(crop.name);
        }
    });

    // Provide recommendations
    let result;
    if (bestCrops.length > 0) {
        result = `Recommended crops based on your soil conditions are: ${bestCrops.join(', ')}.`;
    } else {
        result = 'Soil conditions do not match well with the available crop data. Consider adjusting soil conditions.';
    }

    // Display result
    document.getElementById('result').innerText = result;
}
