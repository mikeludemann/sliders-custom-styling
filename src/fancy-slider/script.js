(function() {

  var elements = function(selector, context) {

    var context = context || document;
    var elements = context.querySelectorAll(selector);

    return [].slice.call(elements);

  };

  function _fncSliderInit(slider, options) {

    var prefix = ".fancy--";

    var _slider = slider;
    var _slidesCont = _slider.querySelector(prefix + "slider--elements");
    var _slides = elements(prefix + "slider--element", _slider);
    var _controls = elements(prefix + "navigation--control--element", _slider);
    var _controlsBgs = elements(prefix + "navigation--background--element", _slider);
    var _progressAS = elements(prefix + "navigation--control--progress", _slider);

    var numOfSlides = _slides.length;
    var curSlide = 1;
    var sliding = false;
    var slidingAT = +parseFloat(getComputedStyle(_slidesCont)["transition-duration"]) * 1000;
    var slidingDelay = +parseFloat(getComputedStyle(_slidesCont)["transition-delay"]) * 1000;

    var autoSlidingActive = false;
    var autoSlidingTO;
    var autoSlidingDelay = 5000;
    var autoSlidingBlocked = false;

    var activeSlide;
    var activeControlsBg;
    var prevControl;

    function setIDs() {

      _slides.forEach(function(slide, index) {

        slide.classList.add("fancy--slider--element--" + (index + 1));

      });

      _controls.forEach(function(control, index) {

        control.setAttribute("data-slider", index + 1);
        control.classList.add("fancy--navigation--control--" + (index + 1));

      });

      _controlsBgs.forEach(function(bg, index) {

        bg.classList.add("fancy--navigation--background--element--" + (index + 1));

      });

    };

    setIDs();

    function afterSlidingHandler() {

      _slider.querySelector(".mode--previous--slide--element").classList.remove("mode--slide--active", "mode--previous--slide--element");
      _slider.querySelector(".mode--previous--navi--background").classList.remove("mode--navi--background--active", "mode--previous--navi--background");

      activeSlide.classList.remove("mode--before--sliding");
      activeControlsBg.classList.remove("mode--navi--background--before");
      prevControl.classList.remove("mode--previous--control");
      prevControl.classList.add("mode--reset--progress");

      var triggerLayout = prevControl.offsetTop;

      prevControl.classList.remove("mode--reset--progress");

      sliding = false;

      var layoutTrigger = _slider.offsetTop;

      if (autoSlidingActive && !autoSlidingBlocked) {

        setAutoslidingTO();

      }

    };

    function performSliding(slideID) {

      if (sliding) {
        
        return;
      
      }
      
      sliding = true;

      window.clearTimeout(autoSlidingTO);
      curSlide = slideID;

      prevControl = _slider.querySelector(".mode--active--control");
      prevControl.classList.remove("mode--active--control");
      prevControl.classList.add("mode--previous--control");
      _slider.querySelector(prefix + "navigation--control--" + slideID).classList.add("mode--active--control");

      activeSlide = _slider.querySelector(prefix + "slider--element--" + slideID);
      activeControlsBg = _slider.querySelector(prefix + "navigation--background--element--" + slideID);

      _slider.querySelector(".mode--slide--active").classList.add("mode--previous--slide--element");
      _slider.querySelector(".mode--navi--background--active").classList.add("mode--previous--navi--background");

      activeSlide.classList.add("mode--before--sliding");
      activeControlsBg.classList.add("mode--navi--background--before");

      var layoutTrigger = activeSlide.offsetTop;

      activeSlide.classList.add("mode--slide--active");
      activeControlsBg.classList.add("mode--navi--background--active");

      setTimeout(afterSlidingHandler, slidingAT + slidingDelay);

    };

    function controlClickHandler() {

      if (sliding) {

        return;

      }

      if (this.classList.contains("mode--active--control")) {
        
        return;

      }

      if (options.blockASafterClick) {

        autoSlidingBlocked = true;
        _slider.classList.add("mode--auto--sliding--block");

      }

      var slideID = +this.getAttribute("data-slider");

      performSliding(slideID);

    };

    _controls.forEach(function(control) {

      control.addEventListener("click", controlClickHandler);

    });

    function setAutoslidingTO() {

      window.clearTimeout(autoSlidingTO);

      var delay = +options.autoSlidingDelay || autoSlidingDelay;

      curSlide++;

      if (curSlide > numOfSlides) {
        
        curSlide = 1;
      
      }

      autoSlidingTO = setTimeout(function() {

        performSliding(curSlide);

      }, delay);

    };

    if (options.autoSliding || +options.autoSlidingDelay > 0) {

      if (options.autoSliding === false) {
        
        return;
      
      }
      
      autoSlidingActive = true;
      setAutoslidingTO();
      
      _slider.classList.add("mode--auto--sliding");
      var triggerLayout = _slider.offsetTop;
      
      var delay = +options.autoSlidingDelay || autoSlidingDelay;
      delay += slidingDelay + slidingAT;
      
      _progressAS.forEach(function(progress) {

        progress.style.transition = "transform " + (delay / 1000) + "s";

      });

    }
    
    _slider.querySelector(".fancy--navigation--control--element:first-child").classList.add("mode--active--control");

  };

  var fncSlider = function(sliderSelector, options) {

    var sliders = elements(sliderSelector);

    sliders.forEach(function(slider) {

      _fncSliderInit(slider, options);

    });

  };

  window.fncSlider = fncSlider;

}());

/* Slider initialization
  options:
  autoSliding - boolean
  autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
  blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
*/

fncSlider(".fancy--slider--container", { autoSlidingDelay: 4000 });