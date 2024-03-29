$(document).ready(function(){
    $("#results-section").hide();
    $("#hungarian-form").submit(function(event){
        var matrix = getFormatedMatrix($("#txtMatrix").val());
        getHungarianResult(matrix);
        $("#results-section").show();
        event.preventDefault();
    });

    $("#example").click(function(){
        var example =   "[10,19,8,15,14],\n" +
                        "[10,18,7,17,17],\n" + 
                        "[13,16,9,14,10],\n" +
                        "[12,19,8,18,19]";
        $("#txtMatrix").val(example);
        $("#hungarian-form").submit();
    });
});

function getHungarianResult(matrix){
    var assignments, assignmentsSeen, results, i, j;

    matrix = JSON.parse("[" + matrix + "]");
    assignments = hungarian(matrix);

    // Generate HTML to display the result

    // Run tests assuming it's a cost matrix
    resultsHTML = "<b>Cost matrix with assignments highlighted:</b>"
    resultsHTML += "<table class='table'>";
    assignmentsSeen = 0;
    for(i=0; i<matrix.length; i++) {
        resultsHTML += "<tr>";
        for(j=0; j<matrix[0].length; j++) {
            if(assignmentsSeen < assignments.length && assignments[assignmentsSeen][0] === i && assignments[assignmentsSeen][1] === j) {
                assignmentsSeen++;
                resultsHTML += "<td style=\"background-color: #FFCC99; text-align: right;\">";
            } else {
                resultsHTML += "<td style=\"text-align: right;\">";
            }
            resultsHTML += matrix[i][j];
            resultsHTML += "</td>";
        }
        resultsHTML += "</tr>";
    }
    resultsHTML += "</table><br />\n";

    resultsHTML += "<b>Total cost of assignment:</b> ";
    // This is obviously inefficient to run the entire algorithm again just
    // to get the sum of the assigned costs.  In practice, it would be easy
    // for the end user to use the assignments and the input matrix to
    // compute the sum, but this is to test the built in functionality, when
    // that's all the user needs.
    resultsHTML += hungarian(matrix, false, true);
    resultsHTML += "<br /><br /><br />";

    // Run the same tests assuming it's a profit matrix
    assignments = hungarian(matrix, true);
    resultsHTML += "<b>Profit matrix with assignments highlighted:</b>"
    resultsHTML += "<table class='table'>";
    assignmentsSeen = 0;
    for(i=0; i<matrix.length; i++) {
        resultsHTML += "<tr>";
        for(j=0; j<matrix[0].length; j++) {
            if(assignmentsSeen < assignments.length && assignments[assignmentsSeen][0] === i && assignments[assignmentsSeen][1] === j) {
                assignmentsSeen++;
                resultsHTML += "<td style=\"background-color: #99CCFF; text-align: right;\">";
            } else {
                resultsHTML += "<td style=\"text-align: right;\">";
            }
            resultsHTML += matrix[i][j];
            resultsHTML += "</td>";
        }
        resultsHTML += "</tr>";
    }
    resultsHTML += "</table><br />\n";

    resultsHTML += "<b>Total profit from assignment:</b> ";
    // This is obviously inefficient to run the entire algorithm again just
    // to get the sum of the assigned costs.  In practice, it would be easy
    // for the end user to use the assignments and the input matrix to
    // compute the sum, but this is to test the built in functionality, when
    // that's all the user needs.
    resultsHTML += hungarian(matrix, true, true);
    resultsHTML += "<br />";

    // Write the HTML to the webpage
    document.getElementById("results").innerHTML = resultsHTML;
}

function getFormatedMatrix(insertedMatrix){
    insertedMatrix = insertedMatrix.replace(/(\r\n|\n|\r)/gm,"");
    return insertedMatrix;
}