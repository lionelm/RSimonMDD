$(function () {

	var projectID;
	$(".editP").on("click", function(e){
		
		e.preventDefault();
		projectID = $(this).attr("data-projectID");
		console.log(this);
		$.mobile.changePage( "#update_view", { transition: "flip"} );
		
	});
	
	$(".deleteP").on("click", function(e){
		
		e.preventDefault();
		projectID = $(this).attr("data-projectID");
		console.log(this);
		$.ajax({
			
			type: "GET",
			/* dataType: "json", */
			url: "/upload/deleteProject/",
			data: {id:projectID},
			success: function(){ 
				
				console.log("delete ran");
				window.location="/gestureArt/";
				
			}
			
			
		})

	});
	
	$("#upload_view form [type='submit']").on("click",function(e) {
		
		e.preventDefault();
		$.ajax({
			
			type: "POST",
			dataType: "json",
			url: "upload/upload_file",
			data: $("#upload_view form").serialize(),
			success: function(){ 
				
				window.location="/gestureArt/";
			}
			
			
		})
	 })
		
	$("#update_view").on("pageinit", function(e){
		
		/* console.log("helo world"); */
		$.ajax({
			
			type: "GET",
			dataType: "json",
			url: "upload/editProject/"+ projectID,
			success: function(data){
				
				
				var form = $("#update_view form");
				form.find("[name='title']").attr("value",data.title);
				form.find("[name='id']").attr("value",data.id);
				form.find("[name='medium']").attr("value",data.medium);
				form.find("[name='description']").text(data.description);
				form.find("[name='inspiration']").text(data.inspiration);
				form.find("[type='submit']").on("click",function(e){
					
					e.preventDefault();
					
					$.ajax({
			
						type: "POST",
						dataType: "json",
						url: "upload/updateProject/",
						data: form.serialize(),
						success: function(){ 
							
							$.mobile.changePage( "#welcome_view", { transition: "flip"} );
						}
						
						
					})
				});
				/* console.log(data); */
			}
			
		})
	});
    
});


$.ajax({
  type: "POST",
  url: "some.php",
  data: { name: "John", location: "Boston" }
}).done(function( msg ) {
  alert( "Data Saved: " + msg );
});