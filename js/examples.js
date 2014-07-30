var examples = {
	init: function() {

		// Editor
		
		examples.editor = ace.edit("exampleEditor");
    	examples.editor.getSession().setMode("ace/mode/javascript"); 

    	// Button

    	$("#runButton").click( function() { 
			examples.runExample();    		
    	});
    	$("#resetButton").click( function() { 
			examples.resetExample();    		
    	});
    	$("#closeButton").click( function() { 
			$("#exampleDisplay").hide();    		
    	});    	    	

    	// Example Frame
    	
    	$("#exampleFrame").load(function() {
			var exampleCode = examples.editor.getSession().getValue();
			try {    		
    			$("#exampleFrame")[0].contentWindow.eval(exampleCode);
    		} catch (e) {
    			console.log(e.message);
    		}
    	})

		// Capture clicks

		$('#exampleSelector a').click(function(e) {							
			var sketchURL = $(e.target).attr('href');

			$.ajax({
					url: sketchURL,
					dataType: 'text'
				})
				.done(function (data) {
					examples.resetData = data;
					examples.showExample();
				})
				.fail(function ( jqXHR, textStatus, errorThrown) {
						console.log(errorThrown)
				});

			e.preventDefault();
		});
	},
	showExample: function() {					
		examples.editor.getSession().setValue(examples.resetData); 
		examples.runExample();
		$("#exampleDisplay").show();
	},
	runExample: function() {
      $('#exampleFrame').attr('src', $('#exampleFrame').attr('src'));
	},
	resetExample: function() {
		examples.showExample();
	}
}