function searchForCandidates() {
    var name = document.getElementById('candidate_name').value;
    var key = document.getElementById('candidate_key').value;
    var univ = document.getElementById('candidate_university').value;

    // Just to test, this a list of candidates data,
	candidate_data = [
	{"Name": "Jack",  "Key": "123", "University":"Rice",   "DG": "Y"},
	{"Name": "Yorke", "Key": "456", "University":"Rice",  "DG": "Y"},
	{"Name": "Shashank", "Key": "789",  "University":"Rice", "DG": "Y"},
	{"Name": "Donald Duck", "Key": "000", "University":"Disney",  "DG": "N"},
	{"Name": "Annie", "Key": "000", "University":"Chapman",  "DG": "Y"},
	]

    var table = document.getElementById("resultsTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
	
	// Search for canidates
    var arrayLength = candidate_data.length;
    var found = false
	for (var i = 0; i < arrayLength; i++) {
		if (candidate_data[i]["Name"] == name) {
			found = true
			// Make sure we have the right key
			if (candidate_data[i]["Key"] == key && candidate_data[i]["University"] == univ) {
				cell1.innerHTML = "Graduate name: " + name;
    			cell2.innerHTML = "Graduation Status: " + candidate_data[i]["DG"];
			}

			// Key or university was wrong
			else {
				cell1.innerHTML = "Wrong key or university given";
			}
		}    	
	}
	if (!found) {
		cell1.innerHTML = "Candidate Not Found";
    	cell2.innerHTML = "NA";
	}
  
    
}