(function() {

	function init(item) {

		var items = item.querySelectorAll('li'),
    current = 0,
    autoUpdate = true,
    timeTrans = 4000;

    var nav = document.createElement('nav');
    
    nav.className = 'nav_arrows';
    
    var prevbtn = document.createElement('button');
    
		prevbtn.className = 'previous';
		prevbtn.setAttribute('aria-label', 'Prev');

    var nextbtn = document.createElement('button');
    
		nextbtn.className = 'next';
		nextbtn.setAttribute('aria-label', 'Next');

    var counter = document.createElement('div');
    
		counter.className = 'counter';
		counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

		if (items.length > 1) {

			nav.appendChild(prevbtn);
			nav.appendChild(counter);
			nav.appendChild(nextbtn);
      item.appendChild(nav);
      
		}

    items[current].className = "current";
    
		if (items.length > 1) {
      
      items[items.length-1].className = "previous--slide";
    
    }

		var navigate = function(dir) {

			items[current].className = "";

			if (dir === 'right') {

        current = current < items.length-1 ? current + 1 : 0;
        
			} else {

        current = current > 0 ? current - 1 : items.length-1;
        
			}

			var nextCurrent = current < items.length-1 ? current + 1 : 0,
			prevCurrent = current > 0 ? current - 1 : items.length-1;

			items[current].className = "current";
			items[prevCurrent].className = "previous--slide";
			items[nextCurrent].className = "";

      counter.firstChild.textContent = current + 1;
      
		}

		item.addEventListener('mouseenter', function() {

      autoUpdate = false;
      
		});

		item.addEventListener('mouseleave', function() {

      autoUpdate = true;
      
		});

		setInterval(function() {

      if (autoUpdate) navigate('right');
      
		},timeTrans);

		prevbtn.addEventListener('click', function() {

      navigate('left');
      
		});

		nextbtn.addEventListener('click', function() {

      navigate('right');
      
    });
    
		document.addEventListener('keydown', function(ev) {

      var keyCode = ev.keyCode || ev.which;
      
			switch (keyCode) {
        
				case 37:

					navigate('left');
          break;
          
				case 39:
          
					navigate('right');
          break;
          
      }
      
		});

		item.addEventListener('touchstart', handleTouchStart, false); 
    item.addEventListener('touchmove', handleTouchMove, false);
    
		var x_Coordination = null;
    var y_Coordination = null;
    
		function handleTouchStart(evt) {

			x_Coordination = evt.touches[0].clientX;
      y_Coordination = evt.touches[0].clientY;
      
		};
		function handleTouchMove(evt) {

			if ( ! x_Coordination || ! y_Coordination ) {

        return;
        
			}

			var x_Coordination_Up = evt.touches[0].clientX;
			var y_Coordination_Up = evt.touches[0].clientY;

			var x_Coordination_Different = x_Coordination - x_Coordination_Up;
			var y_Coordination_Different = y_Coordination - y_Coordination_Up;

			if ( Math.abs( x_Coordination_Different ) > Math.abs( y_Coordination_Different ) ) {
        
				if ( x_Coordination_Different > 0 ) {
          
          navigate('right');
          
				} else {

          navigate('left');
          
        }
        
      } 
      
			x_Coordination = null;
      y_Coordination = null;
      
		};


	}

	[].slice.call(document.querySelectorAll('.shop--slider')).forEach( function(item) {

    init(item);
    
	});

})();
