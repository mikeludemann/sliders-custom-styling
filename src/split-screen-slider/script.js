document.addEventListener('DOMContentLoaded', function() {

	var main = document.querySelector('.split--view'),
		topElement = main.querySelector('.top'),
		handle = main.querySelector('.handle'),
		skewIndex = 0,
		dimensionIndex = 0;

	if (main.className.indexOf('skewing') != -1) {

    skewIndex = 1000;
    
	}

	main.addEventListener('mousemove', function(event) {
    
		dimensionIndex = (event.clientX - window.innerWidth / 2) * 0.5;

		handle.style.left = event.clientX + dimensionIndex + 'px';

    topElement.style.width = event.clientX + skewIndex + dimensionIndex + 'px';
    
  });
  
});
