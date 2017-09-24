function authenticate(){
	var key = document.getElementById('private_key').value;
	console.log("private key is: " + key);
	
	// Simulated data
	var key_map = {"123":"Rice","456":"UH"}

	// Get university from private key
	var univ = key_map[key];
	console.log("University is: " + univ);

	// If university is valid, go to registrar page
	if(univ  !== undefined)
	{
		window.location.href = "file:///Users/jackduryea/Desktop/BlockchainProject/UITemplate/univ.html";
	} else {
		
	}
}