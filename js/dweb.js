;

var lienListeExposant = $(".linkid237523, .linkid240723");
var texteListeExposant = $(".linkid237523 span, .linkid240723 span");

  function getSubdomain() {
        var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
        var urlParts = regexParse.exec(window.location.hostname);
        return window.location.hostname.replace(urlParts[0],'').slice(0, -1);
 }
 var subdo = getSubdomain();
 var currentlyAnimating = false;

 $(lienListeExposant).click(function(event){
    event.preventDefault();
  if(subdo == "en") {
    if(currentlyAnimating) {
       return false;
    }
    currentlyAnimating = true;
    $(texteListeExposant).animate({opacity:0})
       .queue(function(){
          $(this).text("Coming soon...").after('<img src="/theme/aiguille-en-fete_desktop/img/ciseaux.gif"/>');
          $(this).dequeue()}).animate({opacity:1});

    setTimeout(function(){
          $(texteListeExposant).animate({opacity:0})
       .queue(function(){
          $(this).text("List of exhibitors");
          $(this).dequeue()}).animate({opacity:1});
          $(".linkid237523 img:last-child, .linkid240723 img:last-child").remove();
          currentlyAnimating = false;
    }, 1700);
  } else {
    if(currentlyAnimating) {
       return false;
    }
    currentlyAnimating = true;
    $(texteListeExposant).animate({opacity:0})
       .queue(function(){
          $(this).text("Bientôt disponible...").after('<img src="/theme/aiguille-en-fete_desktop/img/ciseaux.gif"/>');
          $(this).dequeue()}).animate({opacity:1});
          

    setTimeout(function(){
          $(texteListeExposant).animate({opacity:0})
       .queue(function(){
          $(this).text("Liste des exposants");
          $(this).dequeue()}).animate({opacity:1});
          $(".linkid237523 img:last-child, .linkid240723 img:last-child").remove();
          currentlyAnimating = false;
    }, 1700);
  }
 });