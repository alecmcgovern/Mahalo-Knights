# Mahalo-Knights





 <script type="text/javascript">
			       document.getElementById("upload_widget_opener").addEventListener("click", function() {
			         cloudinary.openUploadWidget({ cloud_name: 'dbyw3rhhs', upload_preset: 'u7xi2rf8'},
			           function(error, result) {
			           	console.log(result);
			             var photoLocation = $('#photo_url');
			             photoLocation.val(result[0]["url"]);
			           });
			       }, false);
			    </script>