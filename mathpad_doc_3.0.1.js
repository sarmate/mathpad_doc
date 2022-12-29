/*

Mathpad Doc est une application permettant de créer des pages web à vocation scientifique.
Copyright (C) 2016  Frattini Fabrice

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or  any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.




*/




/*  MathPad_Doc Javascript */
//
//  Utilise JSX Graph - CodeMirror - JQuery - MathJax (à remplacer par KaTeX ?) - KaTeX - IpGrid - Mathpad
//
//
// TODO LIST :
// Ajouter page-break-after pour impression
// Fait : Ajouter raccourcis &laquo; &raquo;
// Symboles mathématiques à afficher dans une div dragable
// Résolu : Peinture : pointillés à distancer quand le pinceau est large
// JSX : 
// - Résolu : tangente à ellipse : le codage crée des erreurs
// - FAIT : Afficher un message en haut de la fenêtre à chaque clic sur objet
// - Remplacer les tableaux de variations et signes par des codes JSX 
// - Résolu : problème glider sur perpendiculaire (sans doute sur parallèle aussi) : référence à id à la place de name
// - ajouter angle
// - FAIT : ajouter highlight: false à tous les éléments dans le code
// - Résolu : glider sur courbe problème dans le code
// - Résolu (mais à tester) : quand on change la couleur etc d'une courbe d'une fonction, la propriété est changée pour toutes les courbes
// - Fait : Ajouter arc
// - Visible / invisible : mettre les deux possibilités
// - Améliorer les messages. En fonction du stylo afficher différents messages
// - Tangente en dash






var hint = 0;
var nomFichier = ".html";
var editor;
var board;

// Orientation de l'écran en fonction du rapport entre la largeur et la hauteur
// À revoir !!!
function orientationEcran() {
	if (window.innerWidth < window.innerHeight){
		$('#iframecontainer').css('margin-left','0px');
		$('#iframecontainer').css('left','10px');
		$('#iframecontainer').css('right','10px');
		$('#iframecontainer').css('top','50px');
		$('#iframecontainer').css('width','auto');
		$('#iframecontainer').css('height','40%');
		$('#iframecontainer').css('font-size','100%');
		//console.log(document.getElementById("iframecontainer").style);
		
	   $('#textareacontainer').css('top','calc(40% + 50px)');
		$('#textareacontainer').css('left','10px');
		$('#textareacontainer').css('right','10px');
		$('#textareacontainer').css('width','auto');
		$('#textareacontainer').css('height','calc(40% - 0px)');
		$('#textareacontainer').css('bottom','20px');
		$('#textareacontainer').css('margin-bottom','40px');
		$('#textareacontainer').css('font-size','100%');
		
		// Éditeur codeMirror
		var hauteurCode = window.innerHeight*0.45;
		$(".CodeMirror").css('height',hauteurCode);
		
		$('#textareaCode').css('font-size','100%');
		
		$('#menu-demo2').css('font-size','60%');
		$('#menu-demo2').css('padding-left','8px');
		$('#menu-demo2').css('padding-right','8px');
		$('#menu-demo2').css('left','5px');
		$('#menu-demo2 a').css('padding','8px 8px');
		
		$('.boutonBlanc').css('font-size','70%');
		$('#html-filename').css('font-size','70%');
		$('#file').css('font-size','70%');
		
		$('#menu-demo2 ul').css('top','30px');
		}	
	}




// Modification de la taille de la police de la zone d'écriture
var police = 15;
function changePolice(pol) {
	
	police = police + pol;
	
	document.getElementById("textareaCode").style.fontSize = police+"px";
}


//Modification des dimensions du menu
function tailleMenu(n,k) {
		
		var largeur = $('.puce').css('width');
		var hauteur = $('.puce').css('height');
		
		$('.puce').css('width',(parseInt(largeur)+n)+"px");
		
		if ( parseInt(largeur) < 300 || parseInt(hauteur) < 80 ) {
			$('.puce').css('font-size',"15px");
			$('.boutonBlanc').css('font-size',"15px");
		}
		if ( parseInt(largeur) < 110 || parseInt(hauteur) < 30 ) {
			$('.puce').css('font-size',"10px");
			$('.boutonBlanc').css('font-size',"10px");
		}
		if ( parseInt(largeur) < 80 || parseInt(hauteur) < 25) {
			$('.puce').css('font-size',"8px");
			$('.boutonBlanc').css('font-size',"8px");
		}
		
		$('.puce').css('height',(parseInt(hauteur)+k)+"px");
		$('#menu-demo2 ul').css('top',(parseInt(hauteur)+k)+"px");
		var lh = $('.puce').css('line-height');
		$('.puce').css('line-height',(parseInt(lh)+k)+"px");
}



// Ouvrir/Fermer la zone de dessin
var boule = true;

function zonePaint() {
	console.log("paint");
	if (boule) {
		document.getElementById("paint").style.visibility = "visible";
		$('#latexR').css('display','block');
		boule = false;
		}
	else {
		document.getElementById("paint").style.visibility = "hidden";
		$('#latexR').css('display','none');
		boule = true;
	}	
	
}


// Envoyer l'image de la zone de dessin dans le code
function canvasPush() {
	var canvas = $("#canvas");
	var canvasCode = canvas[0].toDataURL();
	
	var numCanvas = Math.floor(1000*Math.random());
	var codeInsert = "<img id=\"img"+numCanvas+"\"  style=\"width:350px;display: block;margin: auto;margin-top: 10px;margin-bottom: 10px;\"/>\n"
	codeInsert += "<script>\n"
	codeInsert += "var img = document.getElementById(\"img"+numCanvas+"\");\n";
	codeInsert += "img.src = \""+canvasCode+"\";\n";
	codeInsert += "\n";
	codeInsert += "\n";
	codeInsert += "</script>"
	insertText(codeInsert,'','textareaCode')
	var tabPosition = editor.getCursor();
	
	var xP = tabPosition.line-5
	editor.foldCode( CodeMirror.Pos( xP,0 ) );
	
}
















    // ------------------------- Zone JSX ---------------------------- //
   //                                                                 //
  //           Gestionnaire de graphiques JSX Graph                  //
 //                                                                 //
// --------------------------------------------------------------- //

var bouleJSX = true;


// Ouvrir / Fermer le gestionnaire de graphiques JSX
function zoneJSX() {	
	if (bouleJSX) {
		console.log("Ouvre JSX");
		document.getElementById("zoneJSX").style.visibility = "visible";
		bouleJSX = false;
		//
		console.log("Change fenêtre 2");
  		console.log( board );
  		board.setBoundingBox([parseFloat($('#xminJSX').val()),parseFloat($('#ymaxJSX').val()),parseFloat($('#xmaxJSX').val()),parseFloat($('#yminJSX').val())]);
  		board.update();
		//
		}
	else {
		console.log("Ferme JSX");
		document.getElementById("zoneJSX").style.visibility = "hidden";
		bouleJSX = true;
	}	
}


$(document).ready(
function(){
	//------- Initialisation des variables ----------------------- //
	var tabUndoJSX = [""];
	var cStepJSX = 1;
	var information = " ";
	var effaceElt = false;
	var dashJSX = 0;
	var couleurJSX = "red";
	var nbPoints = 0;
	var pointsName = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q"
							,"R","S","T","U","V","W","X","Y","Z","A_1","B_1","C_1","D_1",
							"E_1","F_1","G_1","H_1","I_1","J_1","K_1","L_1","M_1","N_1","O_1","P_1","Q_1",
							"R_1","S_1","T_1","U_1","V_1","W_1","X_1","Y_1","Z_1","A_2","B_2","C_2","D_2"];
	var insertElt = [];
	var debutDroite = false;
	var debutSegment = false;
	var debutVecteur = false;
	var debutCercle = false;
	var debutPoly = false;
	var tabPoly = [];
	var zoneJSX = $("#clicJSX");
	var styloJSX = "pointJSX";
	var cursorJSX_X, cursorJSX_Y;
	var debutX, debutY, etapeX, etapeY;
	var coords;
	var grillejsx = true;
	var axejsx = true;
	var clicTexte = false;
	var dashedJSX = false;
	var alphaJSX = false;
	var aimantJSX = false;
	var fillJSX = 0;
	var largeurJSX =  1;
	var clicOnPoint = false;
	var clicOnElt = false;
	var nomPointClic;
	var premierPoint;
   var vertice1, vertice2, vertice3;
   var tabVertices = [];
   var cptElt = 1;
   var objOn;
   var clicPerpPoint = false;
   var clicPerpDroite = false;
   var clicParaPoint = false;
   var clicParaDroite = false;
   var nomDroiteClic;
   var debutEltInter = false;
   var finEltInter = false;
   var premierEltInter;
   var dernierEltInter;
   var clicSegment = false;
   var premierPointInt = false;
   var dernierPointInt = false;
   var clicTangente = false;
   var nomPointTangente;
   var tabInt = [];
   var nomPoly;
   var point1Arc = false;
   var point2Arc = false;
   var point3Arc = false;
   var tabArc = [];
   var point1Ellipse = false;
   var point2Ellipse = false;
   var point3Ellipse = false;
   var tabEllipse = [];
	var tabCodeJSX = [ "boundingbox: [-5, 5, 5, -5],",
	                   "showcopyright: false,",
	                   "axis:false,",
	                   "shownavigation: false,",
	                   "grid:false",	                   
							
							 ];
	
	$("#coulRougeJSX").attr("class", "actif");
	
	// Pour réinitialiser tous les outils (appelé à chaque changement d'outil ou chargement de code)
	function initBegin() {
		console.log("RBT");
		debutDroite = false;
		debutSegment = false;
		debutVecteur = false;
		debutCercle = false;
		debutPoly = false;
		clicOnPoint = false;
		clicPerpPoint = false;
		clicPerpDroite = false;
		clicParaPoint = false;
		clicParaDroite = false;
		debutEltInter = false;
      finEltInter = false;
      clicSegment = false; 
      premierPointInt = false;
   	dernierPointInt = false;
   	clicTangente = false;
   	tabEllipse = [];
   	tabArc = [];
   	point1Arc = false;
   	point2Arc = false;
   	point3Arc = false;
	}
	
	
	// --------------- La fonction principale du gestionnaire de graphiques JSX -------------------- //

	function afficheJSX() {
		// Coordonnées du curseur de la souris sur la fenêtre JSX
		var getMouseCoords = function(e, i) {
        var cPos = board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
    	},
    	// Fonction qui s'exécute au clic de la souris sur la fenêtre
    	down = function(e) {
        var canCreate = true, i, coords, el;

        if (e[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            i = 0;
        }
        coords = getMouseCoords(e, i);
			
		  // On parcours tous les objets JSX de la board, en fonction des stylos et du clic sur les objets ou non on exécute différente actions (effacer, changer de couleurs, mémorisation d'objet si on est en train de chercher une intersection, construire un polygone, etc. )
        for (el in board.objects ) {
        		effaceElt = false;
        	
        		// Si on clic sur un point appartenant à un autre élément
        		if( board.objects[el].elType == 'glider' && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
        			information = "Point : "+board.objects[el].name;
        			console.log("Clic sur le point "+board.objects[el].name)
        			// Si on trace une perpendiculaire
        			if ( styloJSX == "perpJSX"  ) {
            				clicPerpPoint = true;
            				if ( clicOnElt ) {
            	 				clicPerpDroite = false;
            	 			}
            	}
            	// Si on trace une parallèle
            	if ( styloJSX == "paraJSX"  ) {
            				clicParaPoint = true;
            				if ( clicOnElt ) {
            	 				clicParaDroite = false;
            	 			}
            	}
            	// Si on n'est pas en train de gommer, on retient que l'on vient de cliquer sur un glider
        			if ( styloJSX != "gommeJSX" ){clicOnPoint = true;}
        			
        			
        			if ( styloJSX == "integraleJSX" && board.objects[ board.objects[el].parents ].elType == "curve" ) {
        				if ( !premierPointInt ) {
        					console.log( board.objects[el] )
        					premierPointInt = true;
        					tabInt.push( board.objects[el].parents[0] )
        					tabInt.push( board.objects[el] )
        					console.log( tabInt )
        				}
        				else {
        					dernierPointInt = true;
        					tabInt.push( board.objects[el] )
        					console.log( tabInt )
        				}
        			}
        			
        			if ( styloJSX == "tangenteJSX" && board.objects[ board.objects[el].parents ].elType == "curve" ) {
        				clicTangente = true;
        				nomPointTangente = [ board.objects[el].parents[0], board.objects[el] ];
        			}
        			
        			// On mémorise le glider sur lequel on vient de cliquer
        			nomPointClic = board.objects[el];
        			
        			if ( styloJSX == "invisibleJSX" && !effaceElt ){
							board.objects[el].visProp.size = 0;
							board.objects[el].visProp.withlabel = false;
							stampJSX();
        			}
        			
        			if ( styloJSX == "changeCoulJSX" && !effaceElt ){
						if ( board.objects[el].visProp.visible ) {
							console.log(board.objects[el].name);
							board.objects[el].visProp.strokecolor = couleurJSX;
							board.objects[el].visProp.fillcolor = couleurJSX;
							board.objects[el].visProp.size = largeurJSX;
							stampJSX();
						}
						
					}
        			
        			if ( styloJSX == "gommeJSX" && !effaceElt ){
							board.removeObject(board.objects[el])
							stampJSX();
							effaceElt = true;
							break;
        			}
        		}
        		
        		// Si on clique sur un point situé à l'intersection de deux objets
        		if( board.objects[el].elType == 'intersection' && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {

        			information = "Point : "+board.objects[el].name;
        			
        			nomPointClic = board.objects[el];
        			if ( styloJSX != "gommeJSX" ){clicOnPoint = true;}
        			console.log("Clic sur le point "+nomPointClic.name )
        			
        			// Si le point est à l'intersection d'une courbe et d'un autre objet et que l'on construit une intégrale
        			if ( styloJSX == "integraleJSX" && ( board.objects[ board.objects[el].parents[0] ].elType == "curve" || board.objects[ board.objects[el].parents[1] ].elType == "curve" )  ) {
        				if ( !premierPointInt ) {
        					console.log( board.objects[el] )
        					premierPointInt = true;
        					if ( board.objects[ board.objects[el].parents[0] ].elType == "curve" ) {
        						tabInt.push( board.objects[el].parents[0] )
        					}
        					else{
        						tabInt.push( board.objects[el].parents[1] )
        					}
        					tabInt.push( board.objects[el].parents[0] )
        					tabInt.push( board.objects[el] )
        					console.log( tabInt )
        				}
        				else {
        					dernierPointInt = true;
        					tabInt.push( board.objects[el] )
        					console.log( tabInt )
        				}
        			}
        			
        			// Si le point est à l'intersection d'une courbe et d'un autre objet et que l'on construit une tangente
        			if ( styloJSX == "tangenteJSX" && ( board.objects[ board.objects[el].parents[0] ].elType == "curve" || board.objects[ board.objects[el].parents[1] ].elType == "curve" ) ) {
        				clicTangente = true;
        				if ( board.objects[ board.objects[el].parents[0] ].elType == "curve" ) {
        					nomPointTangente = [ board.objects[el].parents[0], board.objects[el] ];
        				}
        				else{
        					nomPointTangente = [ board.objects[el].parents[1], board.objects[el] ];
        				}
        			}
        			
        			if ( styloJSX == "invisibleJSX" && !effaceElt ){
							board.objects[el].visProp.size = 0;
							board.objects[el].visProp.withlabel = false;
							stampJSX();
        			}
        			
        			if ( styloJSX == "changeCoulJSX" && !effaceElt ){
						if ( board.objects[el].visProp.visible ) {
							console.log(board.objects[el].name);
							board.objects[el].visProp.strokecolor = couleurJSX;
							board.objects[el].visProp.fillcolor = couleurJSX;
							board.objects[el].visProp.size = largeurJSX;
							stampJSX();
						}
						
					}
        			
        			if ( styloJSX == "gommeJSX" && !effaceElt ){
							board.removeObject(board.objects[el])
							stampJSX();
							effaceElt = true;
							break;
        			}
        		}
        		
        		
        		// Si on clic sur le milieu d'un segment
        		if( board.objects[el].elType == 'midpoint' && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
        			
        			information = "Point : "+board.objects[el].name;

        			nomPointClic = board.objects[el];
        			if ( styloJSX != "gommeJSX" ){clicOnPoint = true;}
        			console.log("Clic sur le point "+nomPointClic.name )
        			
        			if ( styloJSX == "invisibleJSX" && !effaceElt ){
							board.objects[el].visProp.size = 0;
							board.objects[el].visProp.withlabel = false;
							stampJSX();
        			}
        			
        			if ( styloJSX == "changeCoulJSX" && !effaceElt ){
						if ( board.objects[el].visProp.visible ) {
							console.log(board.objects[el].name);
							board.objects[el].visProp.strokecolor = couleurJSX;
							board.objects[el].visProp.fillcolor = couleurJSX;
							board.objects[el].visProp.size = largeurJSX;
							stampJSX();
						}
						
					}
        			
        			
        			if ( styloJSX == "gommeJSX" && !effaceElt ){
							board.removeObject(board.objects[el])
							stampJSX();
							effaceElt = true;
							break;
        			}
        		}
        		
        		// Si on clic sur un point
            if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
            	 
            	 information = "Point : "+board.objects[el].name;
            	
            	 nomPointClic = board.objects[el];
            	 if ( styloJSX == "perpJSX" ) { 
            	 	clicPerpPoint = true;
            	 	if ( clicOnElt ) {
            	 		clicPerpDroite = false;
            	 	}
            	 }
            	 if ( styloJSX == "paraJSX" ) {
            	 	clicParaPoint = true;
            	 	if ( clicOnElt ) {
            	 		clicParaDroite = false;
            	 	}
            	 }
            	 
            	 if ( styloJSX != "gommeJSX" ){clicOnPoint = true;}
            	 
            	 var ancientX = board.objects[el].coords.usrCoords[1];
            	 var ancientY = board.objects[el].coords.usrCoords[2];
            	
            	if (board.objects[el].elType == "point" && styloJSX == "changeCoulJSX" && !effaceElt ){
						if ( board.objects[el].visProp.visible ) {
							console.log(board.objects[el].name);
							board.objects[el].visProp.strokecolor = couleurJSX;
							board.objects[el].visProp.fillcolor = couleurJSX;
							board.objects[el].visProp.size = largeurJSX;
							stampJSX();
						}
						
					}
					
					if ( styloJSX == "invisibleJSX" && !effaceElt ){
							board.objects[el].visProp.size = 0;
							board.objects[el].visProp.withlabel = false;
							stampJSX();
        			}
            	 
					if (board.objects[el].elType == "point" && styloJSX == "gommeJSX" && !effaceElt ){
						if ( board.objects[el].visProp.visible ) {
							console.log(board.objects[el].name);
							board.removeObject(board.objects[el])
							stampJSX();
							effaceElt = true;
						}
						
					}
					
					// Si on clic sur un point et que l'outils est celui de construction de point, alors on ne crée pas de nouveau point
					if( styloJSX == "pointJSX"){
                	canCreate = false;
               }
               console.log("Clic sur le point "+nomPointClic.name )
               console.log( "ClicOnPoint : "+clicOnPoint )
            	break;
            }
            
            
            
            // Clic sur les axes -- N'a pas l'air de fonctionner
            if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "axis" ) {
           	 	   
           	 	   information = "Axe : "+board.objects[el].name;
           	 	
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
			         
			         if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
            			if ( styloJSX == "perpJSX"  ) { clicPerpDroite = true }
            			if ( styloJSX == "paraJSX"  ) { clicParaDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log("Clic sur axe : "+nomDroiteClic)
            		}
             }
            	
            }
            
            // Clic sur une intégrale
            if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "integral" && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
           	 	
           	 	information = "Intégrale : "+board.objects[el].name;
           	 	
           	 	if ( styloJSX == "changeCoulJSX" ) {
           	 		console.log("Change Int");
           	 		// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
           	 					board.objects[el].visProp.strokecolor = couleurJSX;
           	 					board.objects[el].visProp.fillcolor = couleurJSX;
									board.objects[el].visProp.strokewidth = largeurJSX;
									board.objects[el].visProp.dash = dashJSX;
									stampJSX();
								}
           	 	}
           	 	if ( styloJSX == "gommeJSX" ) {
           	 		console.log("Efface Int")
           	 		board.removeObject(board.objects[el]);
           	 		stampJSX();
            		effaceElt = true;
            		break;
           	 	}
           	 }
           }
           
           // Clic sur une tangente
            if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "tangent" && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
           	 		
           	 		information = "Tangente : "+board.objects[el].name;
           	 		
           	 		clicOnElt = true;
            		if ( styloJSX == "paraJSX"  ) { clicParaDroite = true }
            		if ( styloJSX == "perpJSX"  ) { clicPerpDroite = true }
            		nomDroiteClic = board.objects[el];
            		console.log( "Clic sur la tangente "+nomDroiteClic.name )
            		if ( styloJSX == "interJSX" ) {
            			if ( !debutEltInter  ) {
            				debutEltInter = true;
            				premierEltInter = board.objects[el];
            			}
            			else{
            				finEltInter = true;
            				dernierEltInter = board.objects[el];
            			}
            		}
            			
           	 	if ( styloJSX == "changeCoulJSX" ) {
           	 		console.log("Change tangente")
           	 		// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
			           	 		board.objects[el].visProp.strokecolor = couleurJSX;
									board.objects[el].visProp.strokewidth = largeurJSX;
									board.objects[el].visProp.dash = dashJSX;
									stampJSX();
								}
           	 	}
           	 	
           	 	if ( styloJSX == "invisibleJSX" ) {
           	 			var clean = true;
           	 			// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            			for ( elChild in board.objects[el].childElements ) {

            				if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            					clean = false;
            					console.log("Doublon");
            				}
            			}
            			if ( clean ) {
            				board.objects[el].visProp.strokewidth = 0;
								board.objects[el].visProp.withlabel = false;
								stampJSX();
            			}
           	 	}
           	 	
           	 	if ( styloJSX == "gommeJSX" ) {
           	 			var clean = true;
           	 			// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            			for ( elChild in board.objects[el].childElements ) {
            				if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            					clean = false;
            					console.log("Doublon");
            				}
            			}
            			if ( clean ) {
            				console.log("Efface tangente");
            				board.removeObject(board.objects[el]);
            				stampJSX();
            				effaceElt = true;
            				break;
            			}
           	 	}
           	 }
           }
            
            // Clic sur une droite
            if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "line" ) {
           	 		
           	 		information = "Droite : "+board.objects[el].name;
           	 		
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
			         
			         if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])  ) {
			         	clicOnElt = true;
            			if ( styloJSX == "paraJSX"  ) { clicParaDroite = true }
            			if ( styloJSX == "perpJSX"  ) { clicPerpDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log( "Clic sur la droite "+nomDroiteClic.name )
            			if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            		}
            		
            	            		
            		
            		var x1 = board.objects[el].point1.coords.usrCoords[1];
            		var y1 = board.objects[el].point1.coords.usrCoords[2];
            		var x2 = board.objects[el].point2.coords.usrCoords[1];
            		var y2 = board.objects[el].point2.coords.usrCoords[2];
            		var det = (x0-x1)*(y2-y1) - (y0-y1)*(x2-x1);
            		console.log("Det : "+det)
            		
            		if ( Math.round(det) == 0 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
									board.objects[el].visProp.strokecolor = couleurJSX;
									board.objects[el].visProp.strokewidth = largeurJSX;
									board.objects[el].visProp.dash = dashJSX;
									stampJSX();
								}    			     
        				}
            		
            		if ( Math.round(det) == 0 &&  styloJSX == "invisibleJSX" ) {
            			// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 			var clean = true;
            			for ( elChild in board.objects[el].childElements ) {

            				if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            					clean = false;
            					console.log("Doublon");
            				}
            			}
            			if ( clean ) {
            				board.objects[el].visProp.strokewidth = 0;
								board.objects[el].visProp.withlabel = false;
								stampJSX();
            			}
           	 	  }
            		
            		if ( Math.round(det) == 0 && styloJSX == "gommeJSX" && !effaceElt ) {
            			var clean = true;
            			// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            			for ( elChild in board.objects[el].childElements ) {

            				if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            					clean = false;
            					console.log("Doublon");
            				}
            			}
            			if ( clean ) {
            				console.log("Efface droite");
            				board.removeObject(board.objects[el]);
            				stampJSX();
            				effaceElt = true;
            				break;
            			} 
        				}
        				
        				
					
        			
        			}
        		}
        		
        		// Clic sur une perpendiculaire
        		if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "perpendicular" ) {
           	 	
           	 		information = "Droite perpendiculaire : "+board.objects[el].name;
           	 		
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
			         
			         if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
			         	clicOnElt = true;
            			if ( styloJSX == "perpJSX" ) { clicPerpDroite = true }
            			if ( styloJSX == "paraJSX" ) { clicParaDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log( "Clique sur la droite "+nomDroiteClic.name )        		
            			if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            			
            			if (  styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
		            				console.log( board.objects[el] )
										board.objects[el].visProp.strokecolor = couleurJSX;
										board.objects[el].visProp.strokewidth = largeurJSX;
										board.objects[el].visProp.dash = dashJSX;
										stampJSX();
									}     			     
        					}
        					
        					if ( styloJSX == "invisibleJSX" ) {
        						// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            		
            			if ( styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface perpendiculaire");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}     
        					}
        					      				
        				}        			
        			}
        		}
        		
        		// Clic sur une parallèle
        		if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "parallel" ) {
           	 	
           	 		information = "Droite parallèle : "+board.objects[el].name;
           	 		
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
			         
			         if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) && !clicOnPoint ) {
			         	clicOnElt = true;
            			if ( styloJSX == "perpJSX" ) { clicPerpDroite = true }
            			if ( styloJSX == "paraJSX" ) { clicParaDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log( "Clique sur la droite "+nomDroiteClic.name )
            			
            			if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            			
            			if (  styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
									board.objects[el].visProp.strokecolor = couleurJSX;
									board.objects[el].visProp.strokewidth = largeurJSX;
									board.objects[el].visProp.dash = dashJSX;
									stampJSX();
								}     			     
        					}
            			
            			if ( styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            			
            			if ( styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface parallèle");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}       
        					}
        					  				
        				}        			
        			}
        		}
        		
            
            // Clic sur un segment
            if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "segment" && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
           	 	
           	 		information = "Segment : "+board.objects[el].name;
           	 		
           	 		clicOnElt = true;
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
            		var x1 = board.objects[el].point1.coords.usrCoords[1];
            		var y1 = board.objects[el].point1.coords.usrCoords[2];
            		var x2 = board.objects[el].point2.coords.usrCoords[1];
            		var y2 = board.objects[el].point2.coords.usrCoords[2];
            		var det = (x0-x1)*(y2-y1) - (y0-y1)*(x2-x1);
            		console.log("Det : "+det);
            		//console.log((x0-x1)/(x2-x1));
            		
            		if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
            			if ( styloJSX == "paraJSX"  ) { clicParaDroite = true }
            			if ( styloJSX == "perpJSX"  ) { clicPerpDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log( "Clic sur le segment "+nomDroiteClic.name );
            			clicSegment = true;
            			if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            		}
            		
            		if ( Math.round(det) == 0 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					//if ( (x0-x1)/(x2-x1) > 0.1 && (x0-x1)/(x2-x1) < 0.9   ) {
            						board.objects[el].visProp.strokecolor = couleurJSX;
										board.objects[el].visProp.strokewidth = largeurJSX;
										board.objects[el].visProp.dash = dashJSX;
										stampJSX();      				
            					//}
            				}      
        				}
        				
        				if (  Math.round(det) == 0 && styloJSX == "invisibleJSX" ) {
        						// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            		
            		if ( Math.round(det) == 0 && styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface segment");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}      
        				}

        			}
        		}
        	
        	
        	// Clic sur un vecteur
        	if ( !effaceElt ) {
           	 if ( board.objects[el].elType == "arrow" ) {
           	 	
           	 		information = "Vecteur : "+board.objects[el].name;
           	 		
           	 		if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ){
           	 			clicOnElt = true;
           	 			if ( styloJSX == "paraJSX"  ) { clicParaDroite = true }
            			if ( styloJSX == "perpJSX"  ) { clicPerpDroite = true }
            			nomDroiteClic = board.objects[el];
            			console.log( "Clic sur le vecteur "+nomDroiteClic.name )
        					if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            		}
            		var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
            		var x1 = board.objects[el].point1.coords.usrCoords[1];
            		var y1 = board.objects[el].point1.coords.usrCoords[2];
            		var x2 = board.objects[el].point2.coords.usrCoords[1];
            		var y2 = board.objects[el].point2.coords.usrCoords[2];
            		var det = (x0-x1)*(y2-y1) - (y0-y1)*(x2-x1);
            		console.log("Det : "+det)
            		
            		if ( Math.round(det) == 0 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            			// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
		            			var efface = false;
      		      			if ( x0 == x1) {
            						efface = true;
            					}
            					else {
            					if ( (x2-x1)/(x0-x1)>=1  ) {
	            					efface = true;
   	         				}
      	      			}
         	   			if ( efface ) {
            					board.objects[el].visProp.strokecolor = couleurJSX;
									board.objects[el].visProp.strokewidth = largeurJSX;
									board.objects[el].visProp.dash = dashJSX;
									stampJSX();
            				}
            			}      
        					}
        				
        				if (  Math.round( det ) ==0 && styloJSX == "invisibleJSX" ) {
        						// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            		
            		if ( Math.round(det) == 0 && styloJSX == "gommeJSX" && !effaceElt ) {
            			var efface = false;
            			if ( x0 == x1) {
            				efface = true;
            			}
            			else {
            				if ( (x2-x1)/(x0-x1)>=1  ) {
            					efface = true;
            				}
            			}
            			if ( efface ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface vecteur");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				} 
            			}   
        				}
        			}
        		}
        		
        		// Clic sur un arc de cercle
        		if ( !effaceElt ) {
        			if ( board.objects[el].elType == "arc"  ) {
        				
        				information = "Arc de cercle : "+board.objects[el].name;
        				
        				if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
        					clicOnElt = true;
        					if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            			
            			if ( styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = largeurJSX;
   								board.objects[el].visProp.strokecolor = couleurJSX;
   								board.objects[el].visProp.fillcolor = couleurJSX;
   								board.objects[el].visProp.fillopacity = fillJSX;
   								board.objects[el].visProp.dash = dashJSX;
   								stampJSX();
   							}
            			}
            			
            			if ( styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									board.objects[el].visProp.fillopacity = 0;
									stampJSX();
            				}
           	 			}
           	 			
           	 			if ( styloJSX == "gommeJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface arc de cercle");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				} 
            			
            		}
           	 			
        				}
        				
        			}
        		}
        		
        		
        		
        		// Clic sur une courbe qui une ellipse (l'id contient le mot "ellipse" ajouté à la création de l'élément)
        		if ( !effaceElt ) {
        			if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") != -1 ) {
        				
        				information = "Ellipse : "+board.objects[el].name;
        				
        				if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ) {
        					clicOnElt = true;
        					if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            			
            			if ( styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = largeurJSX;
   								board.objects[el].visProp.strokecolor = couleurJSX;
   								board.objects[el].visProp.fillcolor = couleurJSX;
   								board.objects[el].visProp.fillopacity = fillJSX;
   								board.objects[el].visProp.dash = dashJSX;
   								stampJSX();
   							}
            			}
            			
            			if ( styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									board.objects[el].visProp.fillopacity = 0;
									stampJSX();
            				}
           	 			}
           	 			
           	 			if ( styloJSX == "gommeJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface ellipse");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				} 
            			
            		}
           	 			
        				}
        				
        			}
        		}
        	
        	// Clic sur une courbe (c'est une courbe dont l'id ne comporte pas le mot "ellipse" ni le mot "arc" )
        	if ( !effaceElt ) {
        		if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") == -1 && (board.objects[el].id).search("arc") == -1 ) {
        			
        			information = "Courbe : "+board.objects[el].name;
        			
        			if (board.objects[el].name ){
        				if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ){
        					clicOnElt = true;
        					if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            		}
        				var nom = board.objects[el].name;
        				var txtrawFn = nom.substring( 0,nom.search("elt"));
        				var fonction = board.jc.snippet(txtrawFn, true, 'x', true);
        				var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
            		var diff = Math.abs( y0-fonction(x0) );
            		
            		
            		if ( Math.round(10*diff)/10 < 0.4 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            			
            					board.objects[el].visProp.strokewidth = largeurJSX;
   								board.objects[el].visProp.strokecolor = couleurJSX;
   								board.objects[el].visProp.dash = dashJSX;
   								stampJSX();
   							}
            		}
            		
            		if ( Math.round(10*diff)/10 < 0.4 && styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            		
            		
            		if ( Math.round(10*diff)/10 < 0.4 && styloJSX == "gommeJSX" && !effaceElt ) {
            		
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface courbe fonction");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				} 
            			
            		}
        			}
        			
        		}
        	}
        	
        	// Si on clic sur un cercle
        	if ( !effaceElt ) {
        		if ( board.objects[el].elType == "circle" ) {
        				
        				information = "Cercle : "+board.objects[el].name;
        				
            		var coords = getMouseCoords(e, i);
            		if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ){
            			clicOnElt = true;
        					if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            			}
            		}
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
            		var x1 = board.objects[el].midpoint.coords.usrCoords[1];
            		var y1 = board.objects[el].midpoint.coords.usrCoords[2];
            		var rayon = board.objects[el].radius;
            		var distance = Math.sqrt( Math.pow((x1-x0),2) + Math.pow((y1-y0),2) );
            		console.log("Efface cercle :")
            		console.log("Centre : "+x1+";"+y1);
            		console.log( Math.abs(rayon-distance  ) )
            		
            		
            		if ( Math.abs(rayon-distance  ) < 0.4 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = largeurJSX;
   								board.objects[el].visProp.strokecolor = couleurJSX;
   								board.objects[el].visProp.dash = dashJSX;
   								board.objects[el].visProp.fillopacity = fillJSX;
   								board.objects[el].visProp.fillcolor = couleurJSX;
   								stampJSX();
   							}
        				}
        				
        				if ( Math.abs( rayon-distance ) < 0.4 &&  styloJSX == "invisibleJSX" ) {
        						// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
            					board.objects[el].visProp.fillopacity = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            	
            		if ( Math.abs(rayon-distance  ) < 0.4 && styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface cercle");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}          
        				}
        			
        			}
        	}
        	
        	
        	// Si on clic sur un polygone
        	if ( !effaceElt ) {
        		if ( board.objects[el].elType == "polygon" ) {
        			
        			information = "Polygone : "+board.objects[el].name;
        			
        			console.log("Poly");
        			var coords = getMouseCoords(e, i);
            	var x0 = coords.scrCoords[1];
            	var y0 = coords.scrCoords[2];
            	console.log( "Point dans poly : "+board.objects[el].hasPoint(x0,y0) )
            	
            	if ( board.objects[el].hasPoint(x0,y0) && styloJSX == "changeCoulJSX" && !effaceElt ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            			   	board.objects[el].visProp.strokewidth = largeurJSX;
   								board.objects[el].visProp.strokecolor = couleurJSX;
   								board.objects[el].visProp.dash = dashJSX;
   								board.objects[el].visProp.fillopacity = fillJSX;
   								board.objects[el].visProp.fillcolor = couleurJSX;
   								stampJSX();
   							}
        				}
        				
        			if ( board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2]) ){
        				clicOnElt = true;
        				if ( styloJSX == "interJSX" ) {
            				if ( !debutEltInter  ) {
            					debutEltInter = true;
            					premierEltInter = board.objects[el];
            				}
            				else{
            					finEltInter = true;
            					dernierEltInter = board.objects[el];
            				}
            		}
            	}
            	
            	if ( board.objects[el].hasPoint(x0,y0) &&  styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.strokewidth = 0;
            					board.objects[el].visProp.fillopacity = 0;
									board.objects[el].visProp.withlabel = false;
									stampJSX();
            				}
           	 			}
            	
        			if ( board.objects[el].hasPoint(x0,y0) && styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface polygone");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}     
        				}
        			
        			}
        	}
        	
        	
        	
        	
        	// Si on clic sur un texte
        	if ( !effaceElt ) {
        		if ( board.objects[el].elType == "text" ) {
        			
        			information = "Texte : "+board.objects[el].name;
        			
        			if (board.objects[el].name ){
        				var nom = board.objects[el].name;
        				var coords = getMouseCoords(e, i);
            		var x0 = coords.usrCoords[1];
            		var y0 = coords.usrCoords[2];
            		var x1 = board.objects[el].coords.usrCoords[1];
            		var y1 = board.objects[el].coords.usrCoords[2];
            		var dist = Math.sqrt( Math.pow((x1-x0),2) + Math.pow((y1-y0),2) );
            		
            		
            		if ( dist < 0.3 && styloJSX == "changeCoulJSX" && !effaceElt ) {
            			// Si l'élément possède un enfant au niveau du curseur alors on ne change pas la couleur de l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
           	 				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(x0 - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(y0 - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
	            			var fs = 12+4*(largeurJSX-1);            			
   	         			board.objects[el].visProp.fontsize = fs;
      	      			board.objects[el].visProp.strokecolor = couleurJSX;
      	      			stampJSX();
      	      		}
            		}
            		
            		if ( board.objects[el].hasPoint(coords.scrCoords[1],coords.scrCoords[2]) &&  styloJSX == "invisibleJSX" ) {
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
           	 				var clean = true;
            				for ( elChild in board.objects[el].childElements ) {

            					if( Math.abs(coords.scrCoords[1] - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(coords.scrCoords[2] - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					board.objects[el].visProp.fontsize = 0;
            					stampJSX();
            				}
           	 			}
            		
            		
            		if ( board.objects[el].hasPoint(coords.scrCoords[1],coords.scrCoords[2]) && styloJSX == "gommeJSX" && !effaceElt ) {
            				var clean = true;
            				// Si l'élément possède un enfant au niveau du curseur alors on n'efface pas l'élément (en gros si on clic sur un point appartenant à un segment et donc aussi sur le segment)
            				for ( elChild in board.objects[el].childElements ) {
            					if( Math.abs(coords.scrCoords[1] - board.objects[elChild].coords.usrCoords[1])<0.2 && Math.abs(coords.scrCoords[2] - board.objects[elChild].coords.usrCoords[2])<0.2 ){
            						clean = false;
            						console.log("Doublon");
            					}
            				}
            				if ( clean ) {
            					console.log("Efface texte");
            					board.removeObject(board.objects[el]);
            					stampJSX();
            					effaceElt = true;
            					break;
            				}     
        				}
        			}
        			
        		}
        	}
        	
        	
        	}
		  
		  // Affichage du message :
		  
		  document.getElementById("messageJSX").innerHTML = information;
		  
		  
		  // La partie qui crée des objets JSX en fonction des stylos
		  // La grosse astuce pour ensuite générer du code, ou même gérer certaines fonctionnalités des stylos est de
		  // "sauvegarder" des données dans l'id de l'élément sous la forme d'une string. On met des séparateurs aussi pour spliter et obtenir des tableaux exploitables
		  
        if (canCreate) {
        		if ( styloJSX == "pointJSX" && !clicTexte ) {
        			var x = Math.round(10*coords.usrCoords[1])/10;
        			var y = Math.round(10*coords.usrCoords[2])/10;
        			
        			if ( aimantJSX) {
        				x = Math.round(x);
        				y = Math.round(y);
        			}
        			
        			// On détecte si on clic sur un élément. Si oui on construit un glider et non un point - sinon on construit un point
        			for (el in board.objects) {
        				clicOnElt = false;
        				var x0 = coords.scrCoords[1];
            		var y0 = coords.scrCoords[2];
        				if ( board.objects[el].hasPoint(x0,y0) && board.objects[el].elType != 'point' && board.objects[el].elType != 'polygon' && board.objects[el].elType != 'text'  ) {
        						objOn = board.objects[el].name;
        						if ( board.objects[el].elType == 'curve') {
        							console.log( board.objects[el] )
        							objOn =  objOn.substring( objOn.search("elt") )
        						}
        						clicOnElt = true;
        						break;
        				}
        			}
        			
        			if ( clicOnElt ) {
        				board.create('glider', [x, y, board.objects[el]],{ fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false} });
        				clicOnElt = false;
        				stampJSX();
        				
        			}
        			else{
        				board.create('point', [x, y],{fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false} });
        				stampJSX();
        			}
        			
        			
        			
        		}
        		
        		// Construction d'une droite, on regarde si on clic sur un point déjà créé ou non pour chacun des deux points par lesquels passent la droite
        		if ( styloJSX == "droiteJSX" && !clicTexte ) {
        			if ( !debutDroite ) {
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					debutDroite = true;
        					vertice1 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineD',fixed: true,withLabel:false});
        					stampJSX();
        					debutDroite = true;
        					vertice1 = [debutX, debutY];
        				}
        			}
        			else {
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					vertice2 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					var x = Math.round(10*coords.usrCoords[1])/10;
        					var y = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						x = Math.round(x);
        						y = Math.round(y);
        					}
        					vertice2 = [x,y]
        				}
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('line',[ vertice1, vertice2 ], {id: nameElt, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX});
        				stampJSX();
        				cptElt++;
        				debutDroite = false;
        				
        				// On efface le premier point que l'on a dû éventuellement créer
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineD" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        			}
        		}
        		
        		// Construction d'une droite, on regarde si on clic sur un point déjà créé ou non pour chacune des deux extrémités du segment
        		if ( styloJSX == "segmentJSX" && !clicTexte ) {
        			if ( !debutSegment ) {
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					debutSegment = true;
        					vertice1 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineS',fixed: true,withLabel:false});
        					stampJSX();
        					debutSegment = true;
        					vertice1 = [debutX, debutY];
        				}
        			}
        			else {
        				
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					vertice2 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					var x = Math.round(10*coords.usrCoords[1])/10;
        					var y = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						x = Math.round(x);
        						y = Math.round(y);
        					}
        					vertice2 = [x,y]
        				}

        				var nameElt = "elt_"+cptElt;
						window[nameElt] = board.create('segment',[ vertice1, vertice2 ], {id: nameElt, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX});
						stampJSX();
						cptElt++;
        				tabCodeJSX.push( "board.create('segment',[ "+premierPoint+",["+x+", "+y+"] ], {fixed: true, strokeColor: '"+couleurJSX+"', dash: "+dashJSX+", strokeWidth: "+largeurJSX+"});");
        				debutSegment = false;
        				
        				// On efface le premier point éventuellement créé
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineS" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        				
        			}
        		}
        		
        		// Idem que droite et segment au dessus
        		if ( styloJSX == "vecteurJSX" && !clicTexte ) {
        			if ( !debutVecteur ) {
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					debutVecteur = true;
        					vertice1 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineV',fixed: true,withLabel:false});
        					stampJSX();
        					debutVecteur = true;
        					vertice1 = [debutX, debutY];
        				}
        			}
        			else {
        				
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					vertice2 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					var x = Math.round(10*coords.usrCoords[1])/10;
        					var y = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						x = Math.round(x);
        						y = Math.round(y);
        					}
        					vertice2 = [x,y]
        				}
        				var nameElt = "elt_"+cptElt;
  						window[nameElt] = board.create('arrow',[ vertice1, vertice2 ], {id: nameElt, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX});
  						stampJSX();
  						cptElt++;
        				tabCodeJSX.push( "board.create('arrow',[ "+premierPoint+",["+x+", "+y+"] ], {fixed: true, strokeColor: '"+couleurJSX+"', dash: "+dashJSX+", strokeWidth: "+largeurJSX+"});");
        				debutVecteur = false;
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineV" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        				
        			}
        		}
        		
        		
        		
        		
        		
        		
        		// Pour le polygone, on regarde à chaque étape si le point est à créer ou si il est déjà dans la figure. Dès que le premier et dernier point sont les mêmes on construit le polygone.
        		// À chaque étape un segment est construit.
        		// Il faut bien gérer le premier et dernier point et enregistrer les données dans l'id du polygone sinon on ne pourra créer le bon code. La technique a été de donner un nom aléatoire aux points intermédiaires
        		// pour chaque polygone de la figure
        		
        		if ( styloJSX == "polyJSX" && !clicTexte ) {
        			if ( !debutPoly ) {
        				nomPoly = Math.floor(Math.random()*1000);
        				console.log( "Nom poly : "+nomPoly )
        				debutX = Math.round(10*coords.usrCoords[1])/10;
     					debutY = Math.round(10*coords.usrCoords[2])/10;
     					if ( aimantJSX ) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					debutPoly = true;
        					tabVertices = [ premierPoint ];
        					clicOnPoint = false;
        					vertice1 = premierPoint;
        				}
        				else{
        					etapeX = debutX;
        					etapeY = debutY;
        					vertice1 = [debutX, debutY];
        					board.create('point', vertice1, {size:1, name:'origineP'+nomPoly, id:'origineP'+nomPoly, fixed: true,withLabel:false});
        					stampJSX();
        					for (el in board.objects) {
        						if ( board.objects[el].name == "origineP"+nomPoly ) {
        							tabVertices = [ board.objects[el] ];
        						}
        					}
        					
        					debutPoly = true;
        				}
        			}
        			else {
        				var x = Math.round(10*coords.usrCoords[1])/10;
        				var y = Math.round(10*coords.usrCoords[2])/10;
        				if ( aimantJSX) {
        						x = Math.round(x);
        						y = Math.round(y);
        					}
        				if ( clicOnPoint) {
        					premierPoint = nomPointClic;
        					tabVertices.push( premierPoint );
        					clicOnPoint = false;
        					vertice2 = premierPoint;
        				}
        				else{
        					tabVertices.push([x,y] );
        					vertice2 = [x,y];
        				}
        				var nameElt = "elt_"+cptElt;
             		window[nameElt] = board.create('segment',[ vertice1,vertice2 ], {id: nameElt, name: nameElt, fixed: true, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX});
             		stampJSX();
             		cptElt++;
        				vertice1 = vertice2;
        				if ( tabVertices[0].coords && tabVertices[ tabVertices.length-1 ].coords ) {
        					console.log( tabVertices[0].coords.usrCoords );
        					console.log( tabVertices[ tabVertices.length-1 ].coords.usrCoords  )
        					if ( tabVertices[0].coords.usrCoords[1] == tabVertices[ tabVertices.length-1 ].coords.usrCoords[1] ) {
        						if ( tabVertices[0].coords.usrCoords[2] == tabVertices[ tabVertices.length-1 ].coords.usrCoords[2] ) {
        							console.log(tabVertices);
        							debutPoly = false;
        							var nameElt = "elt_"+cptElt;
             					window[nameElt] = board.create('polygon' , tabVertices, {id: nameElt, name: nameElt, hasInnerPoints: true, fixed: true, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX,vertices: {visible:false},withLines:false});
             					stampJSX();
        							cptElt++;
        							for (el in board.objects) {
        								if ( board.objects[el].name == "origineP"+nomPoly ) {
        									board.objects[el].visProp.withlabel = false;
        									board.objects[el].visProp.size = 0;
        								}
        							}
        						}
        					}        					
        				}      				
        			}
        		}
        		
        		
        		
        		// Création d'un cercle : là aussi il faut voir si on clique sur un point déjà créé ou non pour le centre
        		if ( styloJSX == "cercleJSX" && !clicTexte ) {
        			if ( !debutCercle ) {
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					debutCercle = true;
        					vertice1 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineC',fixed: true,withLabel:false});
        					stampJSX();
        					debutCercle = true;
        					vertice1 = [debutX, debutY];
        				}
        			}
        			else {        				
        				if ( clicOnPoint ) {
        					premierPoint = nomPointClic;
        					vertice2 = premierPoint;
        					clicOnPoint = false;
        				}
        				else{
        					var x = Math.round(10*coords.usrCoords[1])/10;
        					var y = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						x = Math.round(x);
        						y = Math.round(y);
        					}
        					vertice2 = [x,y]
        				}
        				var nameElt = "elt_"+cptElt;
             		window[nameElt] = board.create('circle',[ vertice1, vertice2 ], {id: nameElt, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX});
             		stampJSX();
             		cptElt++;
        				debutCercle = false;
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineC" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        				
        			}
        		}
        		
        		// Pour créer un arc de cercle il faut trois points. On gère l'addition des points dans un tableau que l'on push au fur et à mesure des clics
        		if ( styloJSX == "arcJSX" && !clicTexte ) {
        			
        			if ( tabArc.length < 2 ) {
        				console.log( "Arc point n°"+tabArc.length )
        				if ( clicOnPoint ) {
        					tabArc.push( nomPointClic );
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineArc',fixed: true,withLabel:false});
        					stampJSX();
        					tabArc.push( [debutX, debutY] );
        				}
        				
        			}
        			else{
        				if ( clicOnPoint ) {
        					tabArc.push( nomPointClic );
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					tabArc.push( [debutX, debutY] );
        				}
        				var nameElt = "elt_"+cptElt;
             		window[nameElt] = board.create('arc', tabArc , {id: nameElt+'$arc', name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX});
             		
             		console.log("Arc créé")
             		var nElt = 0;
             		for (elt in tabArc) {
             			nElt++;
             			if ( tabArc[elt][0] ) {
             				if (nElt == 1) {
             					board.objects[nameElt+'$arc'].center.visProp.size = largeurJSX;
             					board.objects[nameElt+'$arc'].center.visProp.strokecolor = couleurJSX;
             					board.objects[nameElt+'$arc'].center.visProp.fillcolor = couleurJSX;
             				}
             				if (nElt == 2) {
             					board.objects[nameElt+'$arc'].radiuspoint.visProp.size = largeurJSX;
             					board.objects[nameElt+'$arc'].radiuspoint.visProp.strokecolor = couleurJSX;
             					board.objects[nameElt+'$arc'].radiuspoint.visProp.fillcolor = couleurJSX;
             				}
             				if (nElt == 3) {
             					board.objects[nameElt+'$arc'].anglepoint.visProp.size = largeurJSX;
             					board.objects[nameElt+'$arc'].anglepoint.visProp.strokecolor = couleurJSX;
             					board.objects[nameElt+'$arc'].anglepoint.visProp.fillcolor = couleurJSX;
             				}
             			}
             			
             		}
             		
						
             		
             		
             		stampJSX();
             		cptElt++;
        				tabArc = []
        				
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineArc" ) {
        						console.log("Efface point arc")
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        			}
	
        			
        		}
        		
        		// Pour créer une ellipse il faut trois points. On gère l'addition des points dans un tableau que l'on push au fur et à mesure des clics
        		if ( styloJSX == "ellipseJSX" && !clicTexte ) {
        			
        			if ( tabEllipse.length < 2 ) {
        				console.log( "Ellipse point n°"+tabEllipse.length )
        				if ( clicOnPoint ) {
        					tabEllipse.push( nomPointClic );
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					board.create('point', [debutX, debutY],{size:1, name:'origineE',fixed: true,withLabel:false});
        					stampJSX();
        					tabEllipse.push( [debutX, debutY] );
        				}
        				
        			}
        			else{
        				if ( clicOnPoint ) {
        					tabEllipse.push( nomPointClic );
        					clicOnPoint = false;
        				}
        				else{
        					debutX = Math.round(10*coords.usrCoords[1])/10;
        					debutY = Math.round(10*coords.usrCoords[2])/10;
        					if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        					tabEllipse.push( [debutX, debutY] );
        				}
        				var nameElt = "elt_"+cptElt;
             		window[nameElt] = board.create('ellipse', tabEllipse , {id: nameElt+'$ellipse', name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX});
             		stampJSX();
             		cptElt++;
        				tabEllipse = []
        				
        				for (el in board.objects) {
        					if ( board.objects[el].name == "origineE" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
        			}
	
        			
        		}
        		
        		
        		// Pour les tangentes, besoin que d'un seul point, mais on mémorise les infos de la courbes d'origine dans le nom et l'id
        		if ( styloJSX == "tangenteJSX" ) {
        			if (clicTangente) {
        				var nameElt = "elt_"+cptElt;
        				console.log( nomPointTangente )
        				window[nameElt] = board.create('tangent',[ nomPointTangente[0], nomPointTangente[1].name ], {name: 'tan'+nomPointTangente[0]+nomPointTangente[1].name, id: 'tan$'+nomPointTangente[0]+'$'+nomPointTangente[1].name, fixed: false, strokeColor: couleurJSX, size: largeurJSX, dash: dashJSX   });
        				stampJSX();
             		cptElt++;
        				console.log("Tangente crée")
        				clicTangente = false;
        			}
        		}
        		
        		// En créant une intégrale il faut sauvegarder des données dans nom et id pour créer le code plus tard 
        		if ( styloJSX == "integraleJSX" ){
        			if ( tabInt.length >3 ) {
        				premierPointInt = false;
						dernierPointInt = false;
						tabInt = [];
        			}
        			if ( dernierPointInt ) {
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('integral',[ [  tabInt[1].X(), tabInt[2].X()]  , tabInt[0] ], {name: 'int'+tabInt[0]+tabInt[1].name+tabInt[2].name, id: 'int-'+tabInt[0]+'-'+tabInt[1].name+'-'+tabInt[2].name, fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false}, withLabel: false, curveLeft: {size: 1}, curveRight: {size: 1} });
        				stampJSX();
             		cptElt++;
             		premierPointInt = false;
						dernierPointInt = false;
						console.log("Intégrale crée : ");
						console.log(board.objects);
						console.log(board.objects['int-'+tabInt[0]+'-'+tabInt[1].name+'-'+tabInt[2].name]);
						
						tabInt = [];
        			}
        		}
        		
        		
        		// Idem que pour intégrale
        		if ( styloJSX == "milieuJSX" && !clicTexte ) {
        			
        			if ( clicSegment ) {
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('midpoint',[ nomDroiteClic ], {id: 'milieu-'+nomDroiteClic.name, fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false} });
        				stampJSX();
             		cptElt++;
						clicSegment = false;
						console.log("Milieu créé : "+board.objects['milieu-'+nomDroiteClic.name])       		
        			}
        		}
        		
        		
        		// Idem que précédemment + on gère les clics successifs sur les objets
        		if ( styloJSX == "interJSX" && !clicTexte ) {
        			console.log("Inter premier elt : "+debutEltInter)
        			console.log("Inter dernier elt : "+finEltInter)
        			if ( debutEltInter && finEltInter ) {
        				console.log("Intersection entre "+premierEltInter.name+" et "+dernierEltInter.name);
        				var nomPremier = premierEltInter.name;
        				if ( premierEltInter.elType == "curve" ) {
        					nomPremier = nomPremier.substring( nomPremier.search("elt"));
        				}
        				var nomDernier = dernierEltInter.name;
        				if ( dernierEltInter.elType == "curve" ) {
        					nomDernier = nomDernier.substring( nomDernier.search("elt"));
        				}
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('intersection',[ nomPremier, nomDernier, 0 ], {id: 'inter-'+nomPremier+"-"+nomDernier+"-0", fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false} });
        				stampJSX();
             		cptElt++;
             		var nomInter = 'inter-'+nomPremier+"-"+nomDernier+"-0";
             		var n = board.objects[nomInter].intersectionNumbers.length;
             		
             		
             		if ( premierEltInter.elType == 'circle' || dernierEltInter.elType == 'circle' || premierEltInter.elType == 'curve' || dernierEltInter.elType == 'curve' ) {
             			var nameElt = "elt_"+cptElt;
        					window[nameElt] = board.create('intersection',[ nomPremier, nomDernier, 1], {id: 'inter-'+nomPremier+"-"+nomDernier+"-1", fixed: false, strokeColor: couleurJSX, fillColor: couleurJSX, size: largeurJSX, label: {offset:[5,5], fixed: false} });
        					stampJSX();
             			cptElt++;
             		}
             		debutEltInter = false;
             		finEltInter = false; 
             		
        			}
        		}
        		
        		
        		// Idem que précédemment + on gère les clics successifs sur les objets
        		if ( styloJSX == "perpJSX" && !clicTexte ) {
        			if ( clicPerpDroite && clicPerpPoint ) {
        				console.log("Perpendiculaire à "+nomDroiteClic.name+" passant par "+nomPointClic.name)
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('perpendicular',[ nomPointClic.name, nomDroiteClic.name ], {id: 'perp-'+nomPointClic.name+'-'+nomDroiteClic.name, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX});
        				stampJSX();
             		cptElt++;
             		clicPerpDroite = false;
             		clicPerpPoint = false; 
        			}
        		}
        		
        		// Idem que précédemment + on gère les clics successifs sur les objets
        		if ( styloJSX == "paraJSX" && !clicTexte ) {
        			if ( clicParaDroite && clicParaPoint ) {
        				console.log("Parallèle à "+nomDroiteClic.name+" passant par "+nomPointClic.name)
        				var nameElt = "elt_"+cptElt;
        				window[nameElt] = board.create('parallel',[ nomPointClic.name, nomDroiteClic.name ], {id: 'para-'+nomPointClic.name+'-'+nomDroiteClic.name, name: nameElt, fixed: false, strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX, fillColor: couleurJSX ,fillOpacity: fillJSX});
        				stampJSX();
             		cptElt++;
             		clicParaDroite = false;
             		clicParaPoint = false;
        			}
        		}
        		
        	
        		
        	// On crée un texte
        	if ( clicTexte ) {
        		debutX = coords.usrCoords[1];
        		debutY = coords.usrCoords[2];
        		if ( aimantJSX) {
        						debutX = Math.round(debutX);
        						debutY = Math.round(debutY);
        					}
        		var txtraw = document.getElementById('exprTexte').value;
        		var nom = "texteEtt_"+Math.floor(1000*Math.random());
        		var fs = 12+4*(largeurJSX-1);
  				board.create('text',[debutX,debutY,function (){ return txtraw;}],{id: nameElt, name:nom, withLabel:false,strokeColor: couleurJSX, fixed: false, useMathJax: true, fontSize: fs });
  				stampJSX();
  				txtraw2 = addslashes( txtraw );  				
  				tabCodeJSX.push("board.create('text',["+debutX+","+debutY+",function (){ return '"+txtraw2+"';}],{name:'"+nom+"', withLabel:false,strokeColor: '"+couleurJSX+"',fixed: true, useMathJax: true, fontSize: "+fs+"});");
  				board.update();
  				$('#valideTexte').css('background-color','rgba(255,255,255,1');
  				clicTexte = false;
        	}
        	
        	
        }
    }
		
		// Initialisation de la board
		board = JXG.JSXGraph.initBoard('graphJSX', {
			boundingbox: [parseFloat($('#xminJSX').val()),parseFloat($('#ymaxJSX').val()),parseFloat($('#xmaxJSX').val()),parseFloat($('#yminJSX').val())], 
			axis: false, 
			grid: false, 
			showCopyright: false, 
			showNavigation:false, 
			pan: {enabled: false }
		});
				
  		board.on('down', down);

  		
  	}
  	
  	afficheJSX();
  	
  	// Nécessaire pour les formules contenant du LaTeX
	function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
	}




  	$('#xminJSX').click(function() {
  		console.log("Focus Xmin");
  		$('#xminJSX').prop('readonly', false);
	});
  	
  	$('#xmaxJSX').click(function() {
  		console.log("Focus Xmax ");
  		$('#xmaxJSX').prop('readonly', false);
	});
	
	$('#yminJSX').click(function() {
  		console.log("Focus Ymin ");
  		$('#yminJSX').prop('readonly', false);
	});
  	
  	$('#ymaxJSX').click(function() {
  		console.log("Focus Ymax ");
  		$('#ymaxJSX').prop('readonly', false);
	});
  	
  	$('#valideGrille').click(function () {
  		console.log("Change fenêtre 2");
  		console.log( board );
  		board.setBoundingBox([parseFloat($('#xminJSX').val()),parseFloat($('#ymaxJSX').val()),parseFloat($('#xmaxJSX').val()),parseFloat($('#yminJSX').val())]);
  		board.update();
  	});
  	
  	
  	$('#zoneJSXData').click(function () {
  		tabCodeJSX[0] = "boundingbox: ["+parseFloat($('#xminJSX').val())+","+parseFloat($('#ymaxJSX').val())+","+parseFloat($('#xmaxJSX').val())+","+parseFloat($('#yminJSX').val())+"],";
  		zoneJSXPush();
  	});
  	
  	
  	$('#resetJSX').click(function () {
  		console.log("Efface");
  		
  		JXG.JSXGraph.freeBoard(board);
  		effaceElt = false;
		nbPoints = 0;
		insertElt = [];
		debutSegment = false;
		debutCercle = false;
		debutPoly = false;
		debutVecteur = false;
		grillejsx = true;
		axejsx = true;
		clicTexte = false;
		dashedJSX = false;
		tabCodeJSX = [ "boundingbox: [-5, 5, 5, -5],",
	                   "showcopyright: false,",
	                   "axis:false,",
	                   "shownavigation: false,",
	                   "grid:false",	                   
							
							 ];
  		afficheJSX();
  	});
  	
  	
  // La fonction qui crée le code à partir de la board (on devrait utiliser la fonction qui suit pour ne pas être redondant... À faire mais flemme)
  // TODO : 
  
  function zoneJSXPush() {
	
	var numJSX = Math.floor(1000*Math.random());
	var codeInsert = "<div id=\"jsx"+numJSX+"\" style=\"width:"+slider1.value+"px;height:"+slider2.value+"px;margin: auto;margin-top:20px;margin-bottom:20px;\"></div>\n";
	codeInsert += "<script>\n";
	codeInsert += "var board =  JXG.JSXGraph.initBoard('jsx"+numJSX+"', {";
	codeInsert += tabCodeJSX[0];
	codeInsert += tabCodeJSX[1];
	codeInsert += " axis:false, ";
	codeInsert += tabCodeJSX[3];
	codeInsert += tabCodeJSX[4];
	codeInsert += "	});\n";
	
	if ( !axejsx ) {
		codeInsert += "var axeX = board.create('axis', [[0, 0], [1, 0]],{id: 'axeX', name: 'axeX', ticks: {majorHeight: 10, minorHeight: 5, ticksDistance: 1, label: {offset: [-5, -12]},drawZero:true}});\n";
		codeInsert += "var axeY = board.create('axis', [[0, 0], [0, 1]],{id: 'axeY', name: 'axeY', ticks: {majorHeight: 10, minorHeight: 5, ticksDistance: 1, label: {offset: [-15, 0]}, drawZero:false}});\n";
	}
	
	
	

	
	// On parcourt tous les éléments pour générer du code sous forme de string. On utilise certaines infos stockées dans id ou name quand c trop chaud à partir des objets JSX
	
	for (el in board.objects) {
   	if ( board.objects[el].elType == "point" ) {
   		var vis = board.objects[el].visProp.visible;
   		if ( vis ) {
   			var xp = board.objects[el].coords.scrCoords[1];
   			var yp = board.objects[el].coords.scrCoords[2];
   			var ofx = 0;
   			var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   			var nom = board.objects[el].name;
   			var x1 = board.objects[el].coords.usrCoords[1];
   			var y1 = board.objects[el].coords.usrCoords[2];
   			var ts = board.objects[el].visProp.size;
   			var fc = board.objects[el].visProp.fillcolor;
   			var sc = board.objects[el].visProp.strokecolor;
   			var wl = board.objects[el].visProp.withlabel;
   			
   			codeInsert += "var "+nom+" = board.create('point', ["+x1+","+y1+"],{ name: '"+nom+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", withlabel: "+wl+",label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";
   		}
   		
   		
   	}
   	
   	if ( board.objects[el].elType == "segment" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('segment',[ "+txtA+","+txtO+" ], {name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   	}
   	
   	if ( board.objects[el].elType == "line" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('line',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "arrow" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('arrow',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "perpendicular" ) {
   		console.log( "Détecte perpendiculaire" )
   		var nomVar = board.objects[el].name;
   		var pointOrigine =  board.objects[el].id
   		pointOrigine = pointOrigine.split("-");
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		var idElt = 'perp-'+pointOrigine[1]+'-'+pointOrigine[2];
   		if ( vis ) {
   			
   			codeInsert += "var "+nomVar+" = board.create('perpendicular',[ "+pointOrigine[1]+", "+pointOrigine[2]+" ], {id: '"+idElt+"' ,name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   		
   	}
   	
   	if ( board.objects[el].elType == "parallel" ) {
   		console.log( "Détecte parallèle" )
   		var nomVar = board.objects[el].name;
   		var pointOrigine =  board.objects[el].id
   		pointOrigine = pointOrigine.split("-");
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		var idElt = 'para-'+pointOrigine[1]+'-'+pointOrigine[2];
   		if ( vis ) {
   			
   			codeInsert += "var "+nomVar+" = board.create('parallel',[ "+pointOrigine[1]+", "+pointOrigine[2]+" ], {id: '"+idElt+"' ,name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   		
   	}
   	
   	
   	if ( board.objects[el].elType == "tangent" ) {
   		console.log("Détecte tangente ");
   		var nomVar = board.objects[el].name;
   		var origineInt = board.objects[el].id;
   		var tabOrigineInt = origineInt.split("$");
   		console.log( tabOrigineInt );
   		console.log( " taille : "+tabOrigineInt.length );
   		var elt1Int = tabOrigineInt[ tabOrigineInt.length-1 ];
   		var fInt = tabOrigineInt[1];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
			var d = board.objects[el].visProp.dash;
			var idElt = 'tan$'+fInt+'$'+elt1Int;
			
   		codeInsert += "var "+nomVar+" = board.create('tangent',[ "+fInt+","+elt1Int+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "integral" ) {
   		console.log("Détecte intégrale ");
   		var nomVar = board.objects[el].name;
   		var origineInt = board.objects[el].id;
   		var tabOrigineInt = origineInt.split("-");
   		console.log( tabOrigineInt );
   		var elt1Int = tabOrigineInt[2];
   		var elt2Int = tabOrigineInt[3];
   		var fInt = tabOrigineInt[1];
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var idElt = 'int-'+fInt+'-'+elt1Int+'-'+elt2Int;

   		codeInsert += "var "+nomVar+" = board.create('integral',[ ["+elt1Int+".X(), "+elt2Int+".X()], "+fInt+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: false, strokeColor: '"+sc+"', fillColor: '"+fc+"', curveLeft: {size: 1}, curveRight: {size: 1}, withLabel: false, highlight: false});\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "intersection" ) {
   		console.log("Détecte intersection ");
   		var nomVar = board.objects[el].name;
   		var origineInter = board.objects[el].id;
   		var tabOrigineInter = origineInter.split("-");
   		console.log( tabOrigineInter );
   		var elt1Inter = tabOrigineInter[1];
   		var elt2Inter = tabOrigineInter[2];
   		var numInter = tabOrigineInter[3];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   		var idElt = 'inter-'+elt1Inter+'-'+elt2Inter+'-'+numInter;
   		codeInsert += "var "+nomVar+" = board.create('intersection',[ "+elt1Inter+", "+elt2Inter+", "+numInter+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";

   	}
   	
   	if ( board.objects[el].elType == "midpoint" ) {
   		console.log("Milieu détecté");
   		var nomVar = board.objects[el].name;
   		var origineMilieu = board.objects[el].id;
   		var tabOrigineMilieu = origineMilieu.split("-");
   		var segMil = tabOrigineMilieu[1];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   		var idElt = 'milieu-'+segMil;
   		codeInsert += "var "+nomVar+" = board.create('midpoint',[ "+segMil+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "circle" ) {
   		var nomVar = board.objects[el].name;
   		var x0 = board.objects[el].midpoint.coords.usrCoords[1];
   		var y0 = board.objects[el].midpoint.coords.usrCoords[2];
   		var r = board.objects[el].radius;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var fc = board.objects[el].visProp.fillcolor;
   		var vis = board.objects[el].visProp.visible;
   		var fo = board.objects[el].visProp.fillopacity;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			console.log( board.objects[el].inherits[0].name )
   			var txtA, txtO;
   			if ( board.objects[el].inherits[0].name.length > 0 ) {
   				txtA = board.objects[el].inherits[0].name;
   			}
   			else {
   				txtA = "["+x0+","+y0+"]";
   			}
   			if ( board.objects[el].inherits[1].name.length > 0 ) {
   				txtO = board.objects[el].inherits[1].name;
   			}
   			else {
   				txtO = "["+(x0+r)+", "+y0+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('circle',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+fc+"' ,fillOpacity: "+fo+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "polygon" ) {
   		var nomVar = board.objects[el].name;
   		var n = board.objects[el].vertices.length;
   		var textV = "[";
   		for ( var i = 0; i < n; i++) {
   			if ( board.objects[el].vertices[i].name.length > 0 ) {
   				textV += board.objects[el].vertices[i].name+",";
   			}
   			else {
   				textV += "["+board.objects[el].vertices[i].coords.usrCoords[1]+","+board.objects[el].vertices[i].coords.usrCoords[2]+"],";
   			}

   		}
   		textV += "]";
   		
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var fc = board.objects[el].visProp.fillcolor;
   		var vis = board.objects[el].visProp.visible;
   		var fo = board.objects[el].visProp.fillopacity;
   		var d = board.objects[el].visProp.dash;
   		
   		if ( vis ) {
   			codeInsert += "var "+nomVar+" = board.create('polygon' , "+textV+", {name:'"+nomVar+"', hasInnerPoints: true, fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+fc+"' ,fillOpacity: "+fo+",vertices: {visible:false},withLines:false, highlight: false});\n";

   		}
   	}
   	
   	
   	if ( board.objects[el].elType == "arc" ) {
   		console.log("Arc détecté")
   		var nomVar = board.objects[el].name;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var fo = board.objects[el].visProp.fillopacity;
			var txtA = [];
			console.log(board.objects[el])
			txtA.push( board.objects[el].center.name );
			txtA.push( board.objects[el].radiuspoint.name );
			txtA.push( board.objects[el].anglepoint.name );
			
  			codeInsert += "var "+nomVar+" = board.create('arc',["+txtA+"],{id: '"+nomVar+"-arc"+"', name: '"+nomVar+"', withLabel:false, fillOpacity: "+fo+", strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+sc+"', highlight: false});\n";
   	}
   	
   	
   	if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") != -1 ) {
   		console.log( board.objects[el] )
   		var nomVar = board.objects[el].name;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var fo = board.objects[el].visProp.fillopacity;
			var txtA, txtB, textC;
   			if ( board.objects[el].inherits[1].name.length > 0 ) {
   				txtA = board.objects[el].inherits[1].name;
   			}
   			else {
   				txtA = "["+board.objects[el].inherits[1].coords.usrCoords[1]+","+board.objects[el].inherits[1].coords.usrCoords[2]+"]";
   			}
   			if ( board.objects[el].inherits[2].name.length > 0 ) {
   				txtB = board.objects[el].inherits[2].name;
   			}
   			else {
   				txtB = "["+board.objects[el].inherits[2].coords.usrCoords[1]+","+board.objects[el].inherits[2].coords.usrCoords[2]+"]";
   			}
   			if ( board.objects[el].inherits[3].name.length > 0 ) {
   				txtC = board.objects[el].inherits[3].name;
   			}
   			else {
   				txtC = "["+board.objects[el].inherits[3].coords.usrCoords[1]+","+board.objects[el].inherits[3].coords.usrCoords[2]+"]";
   			}
  			
  			codeInsert += "var "+nomVar+" = board.create('ellipse',["+txtA+","+txtB+","+txtC+"],{id: '"+nomVar+"-ellipse"+"', name: '"+nomVar+"', withLabel:false, fillOpacity: "+fo+", strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+sc+"', highlight: false});\n";
   	}
   	
   	
   	if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") == -1 && (board.objects[el].id).search("arc") == -1 ) {
   		var nomVar = board.objects[el].name;
   		var txtraw = nomVar.substring( 0,nomVar.search("elt"));
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var nbalea = Math.floor( Math.random()*1000 );
   		codeInsert += "var f"+nbalea+" = board.jc.snippet('"+txtraw+"', true, 'x', true);\n";
  		
  			codeInsert += "var "+nomVar.substring( nomVar.search("elt"))+" = board.create('functiongraph',[f"+nbalea+"],{id: '"+nomVar.substring( nomVar.search("elt"))+"', name: '"+nomVar+"', withLabel:false,strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   	}
   	
   	if ( board.objects[el].elType == "text" ) {
   		var nomVar = board.objects[el].name;
   		var nomT = board.objects[el].name;
   		var x1 = board.objects[el].coords.usrCoords[1];
   		var y1 = board.objects[el].coords.usrCoords[2];
   		var texte = board.objects[el].htmlStr;
   		var txtraw2 = addslashes( texte );
   		var sc = board.objects[el].visProp.strokecolor;
   		var fs = board.objects[el].visProp.fontsize;
   		var vis = board.objects[el].visProp.visible;
   		
   		var nom = "texteEtt_"+Math.floor(1000*Math.random());
   		
   		if ( vis && nomT.search( "texteEtt") !=-1 ) {
				codeInsert += "var "+nomVar+" = board.create('text',["+x1+","+y1+",function (){ return '"+txtraw2+"';}],{name:'"+nomVar+"', withLabel:false,strokeColor: '"+sc+"', fixed: true, useMathJax: true, fontSize: "+fs+", highlight: false });\n";
			}
   	}
   	
   	if ( board.objects[el].elType == "glider" ) {
   		console.log( "Détecte glider" )
   		var nomOrigine;
   		for (a in board.objects[el].ancestors) {
   			console.log( board.objects[a].name )
   			if ( board.objects[a].name.search("elt") != -1  && board.objects[a].name.search("tan") == -1) {
   				nomOrigine = board.objects[a].name;
   				nomOrigine = nomOrigine.substring( nomOrigine.search("elt") );
   				console.log( "1 "+nomOrigine )
   				break;
   			}
   			if ( board.objects[a].name.search("elt") != -1  && board.objects[a].name.search("tan") != -1) {
   				nomOrigine = board.objects[a].name;
   				console.log( "2 "+nomOrigine )
   				break;
   			}
   			
   		}
   		
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   		for( e in board.objects[el].childElements ){
   			if (board.objects[e].elType == "text" ){
   				ofx = board.objects[e].coords.scrCoords[1]-xp;
   				ofy = yp-board.objects[e].coords.scrCoords[2];
   			}
   		}
   		var nom = board.objects[el].name;
   		var x1 = board.objects[el].coords.usrCoords[1];
   		var y1 = board.objects[el].coords.usrCoords[2];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible; // Si invisible ne pas ajouter
   		if ( vis ) {
   			
   			codeInsert += "var "+nom+" = board.create('glider', ["+x1+","+y1+","+nomOrigine+"],{name: '"+nom+"', fixed: false, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";
   		}
   	}
   	
   }
   
   codeInsert += "\n</script>";
	
	
	insertText(codeInsert,'','textareaCode')
}


// Fait comme précédemment sans les entêtes. Est utilisé quand on redimensionne la fenêtre JSX (donc elle est importante). Devrait être utilisée dans la fonction précédente !!

function getCodeJSX() {
	var codeInsert = "";
	if ( !axejsx ) {
		codeInsert += "var axeX = board.create('axis', [[0, 0], [1, 0]],{id: 'axeX', name: 'axeX', ticks: {majorHeight: 10, minorHeight: 5, ticksDistance: 1, label: {offset: [-5, -12]},drawZero:true}});\n";
		codeInsert += "var axeY = board.create('axis', [[0, 0], [0, 1]],{id: 'axeY', name: 'axeY', ticks: {majorHeight: 10, minorHeight: 5, ticksDistance: 1, label: {offset: [-15, 0]}, drawZero:false}});\n";
	}
	
		
	for (el in board.objects) {
   	if ( board.objects[el].elType == "point" ) {
   		var vis = board.objects[el].visProp.visible;
   		if ( vis ) {
   			var xp = board.objects[el].coords.scrCoords[1];
   			var yp = board.objects[el].coords.scrCoords[2];
   			var ofx = 0;
   			var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   			var nom = board.objects[el].name;
   			var x1 = board.objects[el].coords.usrCoords[1];
   			var y1 = board.objects[el].coords.usrCoords[2];
   			var ts = board.objects[el].visProp.size;
   			var fc = board.objects[el].visProp.fillcolor;
   			var sc = board.objects[el].visProp.strokecolor;
   			var wl = board.objects[el].visProp.withlabel;
   			
   			codeInsert += "var "+nom+" = board.create('point', ["+x1+","+y1+"],{ name: '"+nom+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", withlabel: "+wl+",label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";
   		}
   		
   		
   	}
   	
   	if ( board.objects[el].elType == "segment" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('segment',[ "+txtA+","+txtO+" ], {name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   	}
   	
   	if ( board.objects[el].elType == "line" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('line',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "arrow" ) {
   		var nomVar = board.objects[el].name;
   		var x1 = board.objects[el].point1.coords.usrCoords[1];
   		var y1 = board.objects[el].point1.coords.usrCoords[2];
   		var x2 = board.objects[el].point2.coords.usrCoords[1];
   		var y2 = board.objects[el].point2.coords.usrCoords[2];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			var txtA, txtO;
   			if ( board.objects[el].point1.name.length > 0 ) {
   				txtA = board.objects[el].point1.name;
   			}
   			else {
   				txtA = "["+x1+","+y1+"]";
   			}
   			if ( board.objects[el].point2.name.length > 0 ) {
   				txtO = board.objects[el].point2.name;
   			}
   			else {
   				txtO = "["+x2+", "+y2+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('arrow',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "perpendicular" ) {
   		console.log( "Détecte perpendiculaire" )
   		var nomVar = board.objects[el].name;
   		var pointOrigine =  board.objects[el].id
   		pointOrigine = pointOrigine.split("-");
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		var idElt = 'perp-'+pointOrigine[1]+'-'+pointOrigine[2];
   		if ( vis ) {
   			
   			codeInsert += "var "+nomVar+" = board.create('perpendicular',[ "+pointOrigine[1]+", "+pointOrigine[2]+" ], {id: '"+idElt+"' ,name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   		
   	}
   	
   	if ( board.objects[el].elType == "parallel" ) {
   		console.log( "Détecte parallèle" )
   		var nomVar = board.objects[el].name;
   		var pointOrigine =  board.objects[el].id
   		pointOrigine = pointOrigine.split("-");
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible;
   		var d = board.objects[el].visProp.dash;
   		var idElt = 'para-'+pointOrigine[1]+'-'+pointOrigine[2];
   		if ( vis ) {
   			
   			codeInsert += "var "+nomVar+" = board.create('parallel',[ "+pointOrigine[1]+", "+pointOrigine[2]+" ], {id: '"+idElt+"' ,name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   		}
   		
   	}
   	
   	
   	if ( board.objects[el].elType == "tangent" ) {
   		console.log("Détecte tangente ");
   		var nomVar = board.objects[el].name;
   		var origineInt = board.objects[el].id;
   		var tabOrigineInt = origineInt.split("$");
   		console.log( tabOrigineInt );
   		console.log( " taille : "+tabOrigineInt.length );
   		var elt1Int = tabOrigineInt[ tabOrigineInt.length-1 ];
   		var fInt = tabOrigineInt[1];
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
			var d = board.objects[el].visProp.dash;
			var idElt = 'tan$'+fInt+'$'+elt1Int;
			
   		codeInsert += "var "+nomVar+" = board.create('tangent',[ "+fInt+","+elt1Int+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "integral" ) {
   		console.log("Détecte intégrale ");
   		var nomVar = board.objects[el].name;
   		var origineInt = board.objects[el].id;
   		var tabOrigineInt = origineInt.split("-");
   		console.log( tabOrigineInt );
   		var elt1Int = tabOrigineInt[2];
   		var elt2Int = tabOrigineInt[3];
   		var fInt = tabOrigineInt[1];
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var idElt = 'int-'+fInt+'-'+elt1Int+'-'+elt2Int;

   		codeInsert += "var "+nomVar+" = board.create('integral',[ ["+elt1Int+".X(), "+elt2Int+".X()], "+fInt+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: false, strokeColor: '"+sc+"', fillColor: '"+fc+"', curveLeft: {size: 1}, curveRight: {size: 1}, withLabel: false, highlight: false});\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "intersection" ) {
   		console.log("Détecte intersection ");
   		var nomVar = board.objects[el].name;
   		var origineInter = board.objects[el].id;
   		var tabOrigineInter = origineInter.split("-");
   		console.log( tabOrigineInter );
   		var elt1Inter = tabOrigineInter[1];
   		var elt2Inter = tabOrigineInter[2];
   		var numInter = tabOrigineInter[3];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   		var idElt = 'inter-'+elt1Inter+'-'+elt2Inter+'-'+numInter;
   		codeInsert += "var "+nomVar+" = board.create('intersection',[ "+elt1Inter+", "+elt2Inter+", "+numInter+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";

   	}
   	
   	if ( board.objects[el].elType == "midpoint" ) {
   		console.log("Milieu détecté");
   		var nomVar = board.objects[el].name;
   		var origineMilieu = board.objects[el].id;
   		var tabOrigineMilieu = origineMilieu.split("-");
   		var segMil = tabOrigineMilieu[1];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   			for( e in board.objects[el].childElements ){
   				if (board.objects[e].elType == "text" ){
   					ofx = board.objects[e].coords.scrCoords[1]-xp;
   					ofy = yp-board.objects[e].coords.scrCoords[2];
   				}
   			}
   		var idElt = 'milieu-'+segMil;
   		codeInsert += "var "+nomVar+" = board.create('midpoint',[ "+segMil+" ], {id: '"+idElt+"', name : '"+nomVar+"', fixed: true, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";

   	}
   	
   	
   	if ( board.objects[el].elType == "circle" ) {
   		var nomVar = board.objects[el].name;
   		var x0 = board.objects[el].midpoint.coords.usrCoords[1];
   		var y0 = board.objects[el].midpoint.coords.usrCoords[2];
   		var r = board.objects[el].radius;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var fc = board.objects[el].visProp.fillcolor;
   		var vis = board.objects[el].visProp.visible;
   		var fo = board.objects[el].visProp.fillopacity;
   		var d = board.objects[el].visProp.dash;
   		if ( vis ) {
   			console.log( board.objects[el].inherits[0].name )
   			var txtA, txtO;
   			if ( board.objects[el].inherits[0].name.length > 0 ) {
   				txtA = board.objects[el].inherits[0].name;
   			}
   			else {
   				txtA = "["+x0+","+y0+"]";
   			}
   			if ( board.objects[el].inherits[1].name.length > 0 ) {
   				txtO = board.objects[el].inherits[1].name;
   			}
   			else {
   				txtO = "["+(x0+r)+", "+y0+"]";
   			}
   			codeInsert += "var "+nomVar+" = board.create('circle',[ "+txtA+","+txtO+" ], {name:'"+nomVar+"', fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+fc+"' ,fillOpacity: "+fo+", highlight: false});\n";
   		}
   	}
   	
   	if ( board.objects[el].elType == "polygon" ) {
   		var nomVar = board.objects[el].name;
   		var n = board.objects[el].vertices.length;
   		var textV = "[";
   		for ( var i = 0; i < n; i++) {
   			if ( board.objects[el].vertices[i].name.length > 0 ) {
   				textV += board.objects[el].vertices[i].name+",";
   			}
   			else {
   				textV += "["+board.objects[el].vertices[i].coords.usrCoords[1]+","+board.objects[el].vertices[i].coords.usrCoords[2]+"],";
   			}

   		}
   		textV += "]";
   		
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var fc = board.objects[el].visProp.fillcolor;
   		var vis = board.objects[el].visProp.visible;
   		var fo = board.objects[el].visProp.fillopacity;
   		var d = board.objects[el].visProp.dash;
   		
   		if ( vis ) {
   			codeInsert += "var "+nomVar+" = board.create('polygon' , "+textV+", {name:'"+nomVar+"', hasInnerPoints: true, fixed: true, strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+fc+"' ,fillOpacity: "+fo+",vertices: {visible:false},withLines:false, highlight: false});\n";

   		}
   	}
   	
   	if ( board.objects[el].elType == "arc" ) {
   		console.log("Arc détecté")
   		var nomVar = board.objects[el].name;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var fo = board.objects[el].visProp.fillopacity;
			var txtA = [];
			console.log(board.objects[el])
			txtA.push( board.objects[el].center.name );
			txtA.push( board.objects[el].radiuspoint.name );
			txtA.push( board.objects[el].anglepoint.name );
			
  			codeInsert += "var "+nomVar+" = board.create('arc',["+txtA+"],{id: '"+nomVar+"-arc"+"', name: '"+nomVar+"', withLabel:false, fillOpacity: "+fo+", strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+sc+"', highlight: false});\n";
   	}
   	
   	
   	if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") != -1 ) {
   		console.log( board.objects[el] )
   		var nomVar = board.objects[el].name;
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var fo = board.objects[el].visProp.fillopacity;
			var txtA, txtB, textC;
   			if ( board.objects[el].inherits[1].name.length > 0 ) {
   				txtA = board.objects[el].inherits[1].name;
   			}
   			else {
   				txtA = "["+board.objects[el].inherits[1].coords.usrCoords[1]+","+board.objects[el].inherits[1].coords.usrCoords[2]+"]";
   			}
   			if ( board.objects[el].inherits[2].name.length > 0 ) {
   				txtB = board.objects[el].inherits[2].name;
   			}
   			else {
   				txtB = "["+board.objects[el].inherits[2].coords.usrCoords[1]+","+board.objects[el].inherits[2].coords.usrCoords[2]+"]";
   			}
   			if ( board.objects[el].inherits[3].name.length > 0 ) {
   				txtC = board.objects[el].inherits[3].name;
   			}
   			else {
   				txtC = "["+board.objects[el].inherits[3].coords.usrCoords[1]+","+board.objects[el].inherits[3].coords.usrCoords[2]+"]";
   			}
  			
  			codeInsert += "var "+nomVar+" = board.create('ellipse',["+txtA+","+txtB+","+txtC+"],{id: '"+nomVar+"-ellipse"+"', name: '"+nomVar+"', withLabel:false, fillOpacity: "+fo+", strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", fillColor: '"+sc+"', highlight: false});\n";
   	}
   	
   	
   	if ( board.objects[el].elType == "curve" && (board.objects[el].id).search("ellipse") == -1 && (board.objects[el].id).search("arc") == -1 ) {
   		var nomVar = board.objects[el].name;
   		var txtraw = nomVar.substring( 0,nomVar.search("elt"));
   		var sw = board.objects[el].visProp.strokewidth;
   		var sc = board.objects[el].visProp.strokecolor;
   		var d = board.objects[el].visProp.dash;
   		var nbalea = Math.floor( Math.random()*1000 );
   		codeInsert += "var f"+nbalea+" = board.jc.snippet('"+txtraw+"', true, 'x', true);\n";
  		
  			codeInsert += "var "+nomVar.substring( nomVar.search("elt"))+" = board.create('functiongraph',[f"+nbalea+"],{id: '"+nomVar.substring( nomVar.search("elt"))+"', name: '"+nomVar+"', withLabel:false,strokeColor: '"+sc+"', dash: "+d+", strokeWidth: "+sw+", highlight: false});\n";
   	}
   	
   	if ( board.objects[el].elType == "text" ) {
   		var nomVar = board.objects[el].name;
   		var nomT = board.objects[el].name;
   		var x1 = board.objects[el].coords.usrCoords[1];
   		var y1 = board.objects[el].coords.usrCoords[2];
   		var texte = board.objects[el].htmlStr;
   		var txtraw2 = addslashes( texte );
   		var sc = board.objects[el].visProp.strokecolor;
   		var fs = board.objects[el].visProp.fontsize;
   		var vis = board.objects[el].visProp.visible;
   		
   		var nom = "texteEtt_"+Math.floor(1000*Math.random());
   		
   		if ( vis && nomT.search( "texteEtt") !=-1 ) {
				codeInsert += "var "+nomVar+" = board.create('text',["+x1+","+y1+",function (){ return '"+txtraw2+"';}],{name:'"+nomVar+"', withLabel:false,strokeColor: '"+sc+"', fixed: true, useMathJax: true, fontSize: "+fs+", highlight: false });\n";
			}
   	}
   	
   	if ( board.objects[el].elType == "glider" ) {
   		console.log( "Détecte glider" )
   		var nomOrigine;
   		for (a in board.objects[el].ancestors) {
   			console.log( board.objects[a].name )
   			if ( board.objects[a].name.search("elt") != -1  && board.objects[a].name.search("tan") == -1) {
   				nomOrigine = board.objects[a].name;
   				nomOrigine = nomOrigine.substring( nomOrigine.search("elt") );
   				console.log( "1 "+nomOrigine )
   				break;
   			}
   			if ( board.objects[a].name.search("elt") != -1  && board.objects[a].name.search("tan") != -1) {
   				nomOrigine = board.objects[a].name;
   				console.log( "2 "+nomOrigine )
   				break;
   			}
   			
   		}
   		
   		var xp = board.objects[el].coords.scrCoords[1];
   		var yp = board.objects[el].coords.scrCoords[2];
   		var ofx = 0;
   		var ofy = 0;
   		for( e in board.objects[el].childElements ){
   			if (board.objects[e].elType == "text" ){
   				ofx = board.objects[e].coords.scrCoords[1]-xp;
   				ofy = yp-board.objects[e].coords.scrCoords[2];
   			}
   		}
   		var nom = board.objects[el].name;
   		var x1 = board.objects[el].coords.usrCoords[1];
   		var y1 = board.objects[el].coords.usrCoords[2];
   		var ts = board.objects[el].visProp.size;
   		var fc = board.objects[el].visProp.fillcolor;
   		var sc = board.objects[el].visProp.strokecolor;
   		var vis = board.objects[el].visProp.visible; // Si invisible ne pas ajouter
   		if ( vis ) {
   			
   			codeInsert += "var "+nom+" = board.create('glider', ["+x1+","+y1+","+nomOrigine+"],{name: '"+nom+"', fixed: false, strokeColor: '"+sc+"', fillColor: '"+fc+"', size: "+ts+", label: {offset:["+ofx+","+ofy+"]}, highlight: false });\n";
   		}
   	}
   	
   }
   return codeInsert;
}


// Les boutons et les interactions avec le gestionnaire de graphiques JSX

$("#fingerJSX").click(function() {		
		styloJSX = "fingerJSX";
		$("#fingerJSX").css('background-color','rgba(255,0,0,0.1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});


$("#crayonJSX").click(function() {		
		styloJSX = "pointJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,0,0,0.1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#droiteJSX").click(function() {		
		styloJSX = "droiteJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,0,0,0.1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
$("#traitJSX").click(function() {
		styloJSX = "segmentJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,0,0,0.1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
$("#vecteurJSX").click(function() {		
		styloJSX = "vecteurJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,0,0,0.1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#cercleJSX").click(function() {		
		styloJSX = "cercleJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,0,0,0.1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#polyJSX").click(function() {		
		styloJSX = "polyJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,0,0,0.1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#gommeJSX").click(function() {		
		styloJSX = "gommeJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,0,0,0.1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
$("#invisibleJSX").click(function() {		
		styloJSX = "invisibleJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,0,0,0.1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
	
$("#interJSX").click(function() {		
		styloJSX = "interJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,0,0,0.1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
$("#milieuJSX").click(function() {		
		styloJSX = "milieuJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,0,0,0.1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});	

	
$("#changeCoulJSX").click(function() {		
		styloJSX = "changeCoulJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,0,0,0.1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
	});


$("#perpJSX").click(function() {		
		styloJSX = "perpJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,0,0,0.1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#paraJSX").click(function() {		
		styloJSX = "paraJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,0,0,0.1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});

$("#integraleJSX").click(function() {		
		styloJSX = "integraleJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,0,0,0.1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});


$("#tangenteJSX").click(function() {		
		styloJSX = "tangenteJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,0,0,0.1');
		initBegin();
	});

$("#ellipseJSX").click(function() {		
		styloJSX = "ellipseJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,0,0,0.1');
		$("#arcJSX").css('background-color','rgba(255,255,255,1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});
	
$("#arcJSX").click(function() {		
		styloJSX = "arcJSX";
		$("#fingerJSX").css('background-color','rgba(255,255,255,1');
		$("#traitJSX").css('background-color','rgba(255,255,255,1');
		$("#droiteJSX").css('background-color','rgba(255,255,255,1');
		$("#crayonJSX").css('background-color','rgba(255,255,255,1');
		$("#vecteurJSX").css('background-color','rgba(255,255,255,1');
		$("#cercleJSX").css('background-color','rgba(255,255,255,1');
		$("#ellipseJSX").css('background-color','rgba(255,255,255,1');
		$("#arcJSX").css('background-color','rgba(255,0,0,0.1');
		$("#polyJSX").css('background-color','rgba(255,255,255,1');
		$("#gommeJSX").css('background-color','rgba(255,255,255,1');
		$("#invisibleJSX").css('background-color','rgba(255,255,255,1');
		$("#interJSX").css('background-color','rgba(255,255,255,1');
		$("#milieuJSX").css('background-color','rgba(255,255,255,1');
		$("#changeCoulJSX").css('background-color','rgba(255,255,255,1');
		$("#perpJSX").css('background-color','rgba(255,255,255,1');
		$("#paraJSX").css('background-color','rgba(255,255,255,1');
		$("#integraleJSX").css('background-color','rgba(255,255,255,1');
		$("#tangenteJSX").css('background-color','rgba(255,255,255,1');
		initBegin();
	});


$("#grilleJSX").click(function() {
		if ( grillejsx ) {
			console.log( "Grille 1" );
			tabCodeJSX[4] = "grid: true";
			grillejsx = false;
			board.create('grid', [],{name:'grilleAjout'});
			stampJSX();
			board.update();
			
		}
		else {
			tabCodeJSX[4] = "grid: false";
			grillejsx = true;
			for (el in board.objects) {
        					if ( board.objects[el].name == "grilleAjout" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        				}
			board.update();
			
		}
		
	});

$("#axeJSX").click(function() {
		if ( axejsx ) {
			console.log( "Axes" );
			tabCodeJSX[2] = "axis: true,";
			axejsx = false;
			board.create('axis', [[0, 0], [1.0, 0]],{
					id: 'axeX',
					name: 'axeX',
					ticks: {
						majorHeight: 10,
						minorHeight: 5,
						ticksDistance: 1,
						label: {
			 				offset: [-5, -12]
		   			},
		   		drawZero:true
					} 
					});
			board.create('axis', [[0, 0], [0, 1]],{
					id: 'axeY',
					name: 'axeY',
					ticks: {
						majorHeight: 10,
						minorHeight: 5,
						ticksDistance: 1,
						label: {
			 				offset: [-15, 0]
		   			},
		   		drawZero:false
					} 
					});
			stampJSX();
			board.update();
			
		}
		else {
			tabCodeJSX[2] = "axis: false,";
			axejsx = true;
			for (el in board.objects) {
        					if ( board.objects[el].name == "axeX" || board.objects[el].name == "axeY" ) {
        						board.removeObject(board.objects[el])
        						stampJSX();
        					}
        					
        				}
			board.update();
			
		}
	});

	$("#couleursJSX a").each(function() {
		// Je lui attribut une couleur de fond :
		$(this).css("background", $(this).attr("data-couleur"));
		
		// Et au click :
		$(this).click(function() {
			// Je change la couleur du pinceau :
			couleurJSX = $(this).attr("data-couleur");
			
			// Et les classes CSS :
			$("#couleursJSX a").removeAttr("class", "");
			$(this).attr("class", "actif");
			
			return false;
		});
	});
	
	
	$('#exprAlg').click(function() {
  		console.log("Focus fonction");
  		$('#exprAlg').prop('readonly', false);
	});
	
	
	$('#valideFunc').click(function () {
  		console.log("Trace fonction 2");
  		var txtraw = document.getElementById('exprAlg').value;
  		var f = board.jc.snippet(txtraw, true, 'x', true);
  		
  		var nameElt = "elt_"+cptElt;
      window[nameElt] = board.create('functiongraph',[f],{id: nameElt, name: txtraw+nameElt, withLabel:false,strokeColor: couleurJSX, dash: dashJSX, strokeWidth: largeurJSX});
      stampJSX();
      cptElt++; 		
  		tabCodeJSX.push("f = board.jc.snippet('"+txtraw+"', true, 'x', true);board.create('functiongraph',[f],{name:'"+txtraw+"', withLabel:false,strokeColor: '"+couleurJSX+"',dash:"+dashJSX+", strokeWidth: "+largeurJSX+"});");
  		board.update();
  	});
  	
  	
  	
  	$('#exprTexte').click(function() {
  		console.log("Focus texte");
  		$('#exprTexte').prop('readonly', false);
		$('#exprTexte').focus();
	});
	
	
	$('#valideTexte').click(function () {
  		console.log("Attente clic Texte");
  		clicTexte = true;
  		$('#valideTexte').css('background-color','rgba(255,255,0,0.5');
  	});
  	
  	$("#dashedJSX").click(function() {
		
		if ( dashedJSX ) {
			dashJSX = 0;
			$("#dashedJSX").css('background-color','rgba(255,255,255,1');
			dashedJSX = false;
		}
		else {
			dashJSX = 2;
			$("#dashedJSX").css('background-color','rgba(255,0,0,0.1');
			dashedJSX = true;	
		}
		console.log("Dash : "+dashJSX)
	});




	$("#alphaJSX").click(function() {
		
		if ( alphaJSX ) {
			fillJSX = 0;
			$("#alphaJSX").css('background-color','rgba(255,255,255,1');
			alphaJSX = false;
		}
		else {
			fillJSX = 0.3;
			$("#alphaJSX").css('background-color','rgba(255,0,0,0.1');
			alphaJSX = true;	
		}
		console.log("Opacité : "+fillJSX)
	});
	
	
	$("#aimantJSX").click(function() {
		
		if ( aimantJSX ) {
			$("#aimantJSX").css('background-color','rgba(255,255,255,1');
			aimantJSX = false;
		}
		else {
			$("#aimantJSX").css('background-color','rgba(255,0,0,0.1');
			aimantJSX = true;	
		}
		console.log("Aimant")
	});

	// Largeur du pinceau :
	$("#pinceau1JSX").click(function() {		
			largeurJSX =  1
			$(this).css('text-shadow','3px 3px 3px #505050');
			$('#pinceau2JSX').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau3JSX').css('text-shadow','0px 0px 0px #a0a0a0');
	});
	$("#pinceau2JSX").click(function() {		
			largeurJSX =  2
			$(this).css('text-shadow','3px 3px 3px #505050');
			$('#pinceau1JSX').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau3JSX').css('text-shadow','0px 0px 0px #a0a0a0');
	});
	$("#pinceau3JSX").click(function() {		
			largeurJSX = 3
			$(this).css('text-shadow','3px 3px 3px #505050');
			$('#pinceau1JSX').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau2JSX').css('text-shadow','0px 0px 0px #a0a0a0');
	});

	
	
	$("#insererCodeJSX").click(function() {	
		$('#loadCodeJSX').css('display','block');
	});
	
	

	$("#annuleCodeJSX").click(function() {	
		$('#loadCodeJSX').css('display','none');
	});
	

	// Transforme du code en fenêtre JSX. On utilise donc "eval", même si ça fait peur
	
	$("#valideCodeJSX").click(function() {
		$('#loadCodeJSX').css('display','none');
		console.log("Charge code");
  		
  		JXG.JSXGraph.freeBoard(board);
  		effaceElt = false;
		nbPoints = 0;
		insertElt = [];
		debutSegment = false;
		debutCercle = false;
		debutPoly = false;
		debutVecteur = false;
		grillejsx = true;
		axejsx = true;
		clicTexte = false;
		dashedJSX = false;
		tabCodeJSX = [ "boundingbox: [-5, 5, 5, -5],",
	                   "showcopyright: false,",
	                   "axis:false,",
	                   "shownavigation: false,",
	                   "grid:false",	                   
							
							 ];
		afficheJSX();			
			 
		
		
		
		var codeCopie = document.getElementById("zoneCopieJSX").value;
		console.log( codeCopie );
		
		if ( codeCopie.search("axeX")!= -1 ){
			axejsx = false;
		}
		
		var exprCopie = "";
		
		var tabCodeCopie = codeCopie.split('\n');
		console.log( tabCodeCopie.length );
		
		for (var elt in tabCodeCopie) {
			var expr = tabCodeCopie[elt];
			if ( tabCodeCopie[elt].search( "create" ) !=-1 ) {
				var debutNomBoard = tabCodeCopie[elt].search( "=" );
				var finNomBoard = tabCodeCopie[elt].search( ".create" );
				var debutExpr = "";
				if ( debutNomBoard != -1 ) {
					debutExpr = tabCodeCopie[elt].substring(0, debutNomBoard+1);
				}
				expr = debutExpr+"board"+tabCodeCopie[elt].substring( finNomBoard );
				if ( tabCodeCopie[elt].search( "polygon" ) == -1 ) {
					expr = expr.replace( "fixed: true" , "fixed: false");
				}
				if ( tabCodeCopie[elt].search( "offset:" ) != -1 ) {
					expr = expr.replace( "{offset" , "{fixed: false, offset");
				}
			}
			exprCopie += expr+"\n";
		}
		eval( exprCopie );
  		
	});



// Fonction qui charge du code comme précédemment. Donc fonction à utiliser dans la précédente !! Mais flemme aussi
// Attention elle est utiliser lorsqu'on redimensionne la fenêtre JSX !!!

function chargeCodeJSX( codeACharger ) {
	JXG.JSXGraph.freeBoard(board);
  		effaceElt = false;
		nbPoints = 0;
		insertElt = [];
		debutSegment = false;
		debutCercle = false;
		debutPoly = false;
		debutVecteur = false;
		//grillejsx = true;
		axejsx = true;
		clicTexte = false;
		dashedJSX = false;
		tabCodeJSX = [ "boundingbox: [-5, 5, 5, -5],",
	                   "showcopyright: false,",
	                   "axis:false,",
	                   "shownavigation: false,",
	                   "grid:"+grillejsx,	                   
							
							 ];
		afficheJSX();			
			 
		
		
		
		var codeCopie = codeACharger;
		console.log( codeCopie );
		
		if ( codeCopie.search("axeX")!= -1 ){
			axejsx = false;
		}
		if ( !grillejsx ) {
			codeCopie = "board.create('grid', [],{name:'grilleAjout'});\n"+codeCopie;
		}
		var exprCopie = "";
		
		var tabCodeCopie = codeCopie.split('\n');
		console.log( tabCodeCopie.length );
		
		for (var elt in tabCodeCopie) {
			var expr = tabCodeCopie[elt];
			if ( tabCodeCopie[elt].search( "create" ) !=-1 ) {
				var debutNomBoard = tabCodeCopie[elt].search( "=" );
				var finNomBoard = tabCodeCopie[elt].search( ".create" );
				var debutExpr = "";
				if ( debutNomBoard != -1 ) {
					debutExpr = tabCodeCopie[elt].substring(0, debutNomBoard+1);
				}
				expr = debutExpr+"board"+tabCodeCopie[elt].substring( finNomBoard );
				if ( tabCodeCopie[elt].search( "polygon" ) == -1 ) {
					expr = expr.replace( "fixed: true" , "fixed: false");
				}
				if ( tabCodeCopie[elt].search( "offset:" ) != -1 ) {
					expr = expr.replace( "{offset" , "{fixed: false, offset");
				}
			}
			exprCopie += expr+"\n";
		}
		eval( exprCopie );
}

// Les sliders pour le changement de dimensions de la fenêtre JSX

$("#valideDim").click(function() {
		$('#changeFenJSX').css('display','block');
	});

$("#fermeChangeFenJSX").click(function() {
		$('#changeFenJSX').css('display','none');
	});


var slider1 = document.getElementById("largeurFenJSX");
var output1 = document.getElementById("valLargeurJSX");
output1.innerHTML = parseFloat(slider1.value)+"px";



slider1.oninput = function() {
  output1.innerHTML = parseFloat(this.value)+"px";
  $('#graphJSX').css('width',parseFloat(this.value)+"px");
  chargeCodeJSX( getCodeJSX() )
}

var slider2 = document.getElementById("hauteurFenJSX");
var output2 = document.getElementById("valHauteurJSX");
output2.innerHTML = parseFloat(slider2.value)+"px";

slider2.oninput = function() {
  output2.innerHTML = parseFloat(this.value)+"px";
  $('#graphJSX').css('height',parseFloat(this.value)+"px");
  var h = 650+parseInt( parseFloat(this.value)-350 );
  $('#zoneJSX').css('height',h+"px");
  chargeCodeJSX( getCodeJSX() )
}





function stampJSX() {
	
	if ( cStepJSX <= tabUndoJSX.length ) {
		tabUndoJSX = tabUndoJSX.slice(0,cStepJSX+1)
		tabUndoJSX.push( getCodeJSX() )
		cStepJSX = tabUndoJSX.length;
	}
	else {
		tabUndoJSX.push( getCodeJSX() )
		cStepJSX++;
	}
}



$("#undoJSX").click(function() {
		console.log("Undo ------")
		if (cStepJSX > 0) {
			cStepJSX--;			
			chargeCodeJSX( tabUndoJSX[ cStepJSX ] )
		}
	});


$("#redoJSX").click(function() {
		console.log("Redo ------")
		if (cStepJSX < tabUndoJSX.length-1) {
			cStepJSX++;			
			chargeCodeJSX( tabUndoJSX[ cStepJSX ] )
		}
	});
	 
	 






});


	  
  	
   
  	

	
	
	





// ------------------------------ Fin de Zone JSX




function valide() {
	document.getElementById("chargement").style.visibility = "hidden";
	document.getElementById("textareaCode").innerHTML = sessionStorage.getItem("contenu");
}




function devalide() {
	document.getElementById("chargement").style.visibility = "hidden";
}


$(document).ready(
function(){
	
	// PEINTURE -----------------------------------------------------------------------------------------

	// Variables :
	var stylo = "crayon";
	var color = "red";
	var painting = false;
	var started = false;
	var width_brush = 1;
	var canvas = $("#canvas");
	var cursorX, cursorY;
	var restoreCanvasArray = [];
	var restoreCanvasIndex = 0;
	var oldX, oldY;
	var firstX, firstY;
	var cPushArray = new Array();
	var cStep = 0;
	var readySegment = true;
	var dash = [ ];
	var dashed = false;
	cercle = false;
	
	$("#coulRouge").attr("class", "actif");
	
	var context = canvas[0].getContext('2d');
	cPush();
	// Trait arrondi :
	context.lineJoin = 'round';
	context.lineCap = 'round';
	
	function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push( canvas[0].toDataURL() );	
	 }
	 
	 function cUndo() {
	 	
    	if (cStep > 0) {
        cStep--;
        
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        
        canvasPic.onload = function () { 
        		clear_canvas();
        		context.drawImage(canvasPic, 0, 0); 
        		}
        		
    	  }
	 }
	 
	 
	 
	 function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
    		}
    	  
	 }
	
	// Click souris enfoncé sur le canvas, je dessine :
	canvas.mousedown(function(e) {
		
		if ( stylo == "cercle" ) {
			painting = true;
			// Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft)-10;
			cursorY = (e.pageY - this.offsetTop)-10;
			firstX = cursorX;
			firstY = cursorY;
			oldX = cursorX;
			oldY = cursorY;
			//drawDot();
			started = false;
			cercle = false;
			cPush();
		}
		if ( stylo == "trait" ) {
			painting = true;
			// Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft)-10;
			cursorY = (e.pageY - this.offsetTop)-10;
			firstX = cursorX;
			firstY = cursorY;
			oldX = cursorX;
			oldY = cursorY;
			//drawDot();
			started = false;
			segment = false;
			cPush();
		}
		if ( stylo == "crayon" || stylo == "gomme" ) {
			painting = true;
			premierClic = false;
			// Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft)-10;
			cursorY = (e.pageY - this.offsetTop)-10;
			oldX = cursorX;
			oldY = cursorY;
			}
		
	});
	
	// Relachement du Click sur tout le document, j'arrête de dessiner :
	canvas.mouseup(function() {
		painting = false;
		started = false;
		if ( stylo == "crayon" ) {
			drawDot();
			cPush();
		}
		if ( stylo == "trait" ) {
			segment = false;
		}
		if ( stylo == "gomme" ) {
			cPush();
		}
	});
	
	// Mouvement de la souris sur le canvas :
	canvas.mousemove(function(e) {
		
		// Si je suis en train de dessiner (click souris enfoncé) :
		if (painting) {
			// Set Coordonnées de la souris :
			cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
			cursorY = (e.pageY - this.offsetTop) - 10;
			
			// Dessine une ligne :
			if ( stylo == "crayon" ) {				
				drawLine();
				}
			if (stylo == "trait" && readySegment) {
				moveLine();
				}
			if (stylo == "cercle" && readySegment ) {
				moveCercle();
				}
			if (stylo == "gomme") {
				rectangleEfface();
			}
		}
	});
	
	function moveCercle() {
			
			readySegment = false;
			cStep--;
         
         var canvasPic = new Image();
         canvasPic.src = cPushArray[cStep];
        
         canvasPic.onload = function () { 
         	clear_canvas();
         	context.drawImage(canvasPic, 0, 0); 
         	ecartX = $("#paint").position().left-10;
				ecartY = $("#paint").position().top+10;
				context.beginPath();
				x0 = firstX-ecartX;
				y0 = firstY-ecartY;
				x1 = cursorX-ecartX;
				y1 = cursorY-ecartY;
				context.ellipse((x0+x1)/2, (y0+y1)/2, Math.abs(x1-x0)/2, Math.abs(y1-y0)/2,0,0,2*Math.PI);
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.stroke();
				cercle = true;
				readySegment = true;
				cPush();         	
         	}
         
		
	}
	
	function moveLine() {
			
			readySegment = false;
			cStep--;
         
         var canvasPic = new Image();
         canvasPic.src = cPushArray[cStep];
        
         canvasPic.onload = function () { 
         	clear_canvas();
         	context.drawImage(canvasPic, 0, 0); 
         	ecartX = $("#paint").position().left-10;
				ecartY = $("#paint").position().top+10;
				context.beginPath();
				context.moveTo(firstX-ecartX, firstY-ecartY);
				context.lineTo(cursorX-ecartX, cursorY-ecartY);
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.stroke();
				segment = true;
				readySegment = true;
				cPush();         	
         	}
         
		
	}
	
	// Fonction qui dessine une ligne :
	function drawLine() {
		// Si c'est le début, j'initialise
		ecartX = $("#paint").position().left-10;
		ecartY = $("#paint").position().top+10;
		if (!started) {
			// Je place mon curseur pour la première fois :
			context.beginPath();
			context.moveTo(cursorX-ecartX, cursorY-ecartY);
			started = true;
		} 
		// Sinon je dessine
		else {
			context.lineTo(cursorX-ecartX, cursorY-ecartY);
			context.strokeStyle = color;
			context.lineWidth = width_brush;
			context.stroke();	
				
		}
	}
	
	function drawDot() {
			ecartX = $("#paint").position().left-10;
			ecartY = $("#paint").position().top+10;
			
			if ( premierClic == false && stylo == "trait" ) {
				context.beginPath();
				context.moveTo(cursorX-ecartX, cursorY-ecartY);
				context.lineTo(cursorX-ecartX, cursorY-ecartY);
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.stroke();
				oldX = cursorX;
				oldY = cursorY;
				cPush();
				}
			if ( premierClic == true && stylo == "trait" ) {
				context.beginPath();
				context.moveTo(oldX-ecartX, oldY-ecartY);
				context.lineTo(cursorX-ecartX, cursorY-ecartY);
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.stroke();
				cPush();
				}
			started = false;
			
			if ( premierClic == false && stylo == "crayon" ) {
				context.beginPath();				
				context.strokeStyle = color;
				context.lineWidth = width_brush;
				context.arc(cursorX-ecartX, cursorY-ecartY,1,0,2*Math.PI);
				context.stroke();
				cPush();
				
				}
	}
	
	function rectangleEfface() {
		ecartX = $("#paint").position().left-10;
		ecartY = $("#paint").position().top+10;
		context.clearRect(cursorX-ecartX-2*width_brush, cursorY-ecartY-2*width_brush, 4*width_brush, 4*width_brush);
		context.beginPath();
		context.stroke();
	}
	
	// Clear du Canvas :
	function clear_canvas() {
		context.clearRect(0,0, canvas.width(), canvas.height());
		
	}
	
	// Pour chaque carré de couleur :
	$("#couleurs a").each(function() {
		// Je lui attribut une couleur de fond :
		$(this).css("background", $(this).attr("data-couleur"));
		
		// Et au click :
		$(this).click(function() {
			// Je change la couleur du pinceau :
			color = $(this).attr("data-couleur");
			
			// Et les classes CSS :
			$("#couleurs a").removeAttr("class", "");
			$(this).attr("class", "actif");
			
			return false;
		});
	});
	
	// Largeur du pinceau :
	$("#pinceau1").click(function() {		
			width_brush =  1
			if ( dashed) {
				var d = -0.05*Math.pow(width_brush,2)+3.6*width_brush-1;
				console.log( "Dash : "+d );
				dash = [d ,d];
				context.setLineDash( dash );
			}
			$(this).css('text-shadow','3px 3px 3px #a0a0a0');
			$('#pinceau2').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau3').css('text-shadow','0px 0px 0px #a0a0a0');
	});
	$("#pinceau2").click(function() {		
			width_brush =  5
			if ( dashed) {
				var d = -0.05*Math.pow(width_brush,2)+3.6*width_brush-1;
				console.log( "Dash : "+d );
				dash = [d ,d];
				context.setLineDash( dash );
			}
			$(this).css('text-shadow','3px 3px 3px #a0a0a0');
			$('#pinceau1').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau3').css('text-shadow','0px 0px 0px #a0a0a0');
	});
	$("#pinceau3").click(function() {		
			width_brush =  10
			if ( dashed) {
				var d = -0.05*Math.pow(width_brush,2)+3.6*width_brush-1;
				console.log( "Dash : "+d );
				dash = [d ,d];
				context.setLineDash( dash );
			}
			$(this).css('text-shadow','3px 3px 3px #a0a0a0');
			$('#pinceau1').css('text-shadow','0px 0px 0px #a0a0a0');
			$('#pinceau2').css('text-shadow','0px 0px 0px #a0a0a0');
	});
	
	// Bouton Reset :
	$("#reset").click(function() {
		// Clear canvas :
		clear_canvas();
		
	});
	
	$("#crayon").click(function() {		
		stylo = "crayon";
		$("#crayon").css('background-color','rgba(255,0,0,0.1');
		$("#trait").css('background-color','rgba(255,255,255,1');
		$("#cercle").css('background-color','rgba(255,255,255,1');
		$("#gomme").css('background-color','rgba(255,255,255,1');
	});
	
	$("#trait").click(function() {		
		stylo = "trait";
		$("#trait").css('background-color','rgba(255,0,0,0.1');
		$("#crayon").css('background-color','rgba(255,255,255,1');
		$("#cercle").css('background-color','rgba(255,255,255,1');
		$("#gomme").css('background-color','rgba(255,255,255,1');
	});
	
	$("#cercle").click(function() {		
		stylo = "cercle";
		$("#cercle").css('background-color','rgba(255,0,0,0.1');
		$("#crayon").css('background-color','rgba(255,255,255,1');
		$("#trait").css('background-color','rgba(255,255,255,1');
		$("#gomme").css('background-color','rgba(255,255,255,1');
	});
	
	$("#gomme").click(function() {		
		stylo = "gomme";
		$("#gomme").css('background-color','rgba(255,0,0,0.1');
		$("#crayon").css('background-color','rgba(255,255,255,1');
		$("#trait").css('background-color','rgba(255,255,255,1');
		$("#cercle").css('background-color','rgba(255,255,255,1');
	});
	
	$("#dashed").click(function() {
		
		if ( dashed ) {
			dash = []
			$("#dashed").css('background-color','rgba(255,255,255,1');	
			dashed = false;
		}
		else {
			var d = -0.1*Math.pow(width_brush,2)+4.1*width_brush-1
			console.log( "Dash : "+d );
			dash = [d ,d]
			$("#dashed").css('background-color','rgba(255,0,0,0.1');
			dashed = true;	
		}
		context.setLineDash( dash );
	});
	

	$("#undo").click(function() {
		
		cUndo();
		
	});

	$("#redo").click(function() {
		
		cRedo();
		
	});






// FIN PEINTURE ---------------------------------------------------------------------------------------------------------









	$(document).ready(
	


	




	function(){
	
	
	$("#iframecontainer").css('left',"50%");
	
	var code = $("#textareaCode")[0];
	editor = CodeMirror.fromTextArea(code, {
		lineNumbers : true,
		lineWrapping: true,
   	mode : "text/html",
    	htmlMode: true,
		smartIndent: false,
		extraKeys: {"Alt-F": "findPersistent"},
		extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
	   foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
	});
	
	editor.foldCode(CodeMirror.Pos(2, 0));
	editor.foldCode(CodeMirror.Pos(72, 0));
   
	
	var map1 = {"Ctrl-Space": function () { 
		console.log("Shortcut !!")
		submitTryit() }}
	editor.addKeyMap(map1)
	
	var map2 = {"Ctrl-S": function () { 
		console.log("Shortcut !!")
		sauverFichier() }}
	editor.addKeyMap(map2)
	
	var map3 = {"Ctrl-B": function () { 
		console.log("Shortcut !!")
		insertText('<br />\n','','textareaCode')
		}}
	editor.addKeyMap(map3)
	
	var h = parseInt(window.innerHeight) - 40;
	editor.setSize(null,h);
	
	
	
   
});

	$('.puce').css('width',(parseInt(window.innerWidth)/9+0)+"px");
	$('.puce').css('height',"37px");

var pleinEcran = true;
var ecranHorizontal = true;
var afficheMenu = true;

orientationEcran()



var f = document.getElementById('file');

var res = document.getElementById('textareaCode');







$("textarea").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        // set textarea value to: text before caret + tab + text after caret
        $this.val(value.substring(0, start)
                    + "\t"
                    + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
    });



document.addEventListener( 'keydown', function (event) {

	console.log(event.keyCode);
	if (event.keyCode == 113) {
			submitTryit();
	}
	
	hint++;
	
	setTimeout(function () { decreaseHint() },1000);
	console.log("Hint : "+hint);
	
	
	if (event.keyCode == 115) {
		
		console.log("Plein écran : "+pleinEcran);
		
		if ( pleinEcran ) {
			document.getElementById("iframecontainer").style.width = "100%";
			document.getElementById("iframecontainer").style.height = "100%";
			//document.getElementById("menu").style.display = "none";
			pleinEcran = false;

			}
			else {
				document.getElementById("iframecontainer").style.width = "50%";
				//document.getElementById("menu").style.display = "flex";
				pleinEcran = true;
				
				if ( ecranHorizontal ) {
					document.getElementById("iframecontainer").style.width = "100%";
					document.getElementById("iframecontainer").style.height = "79%";
					document.getElementById("textareacontainer").style.width = "100%";
					document.getElementById("textareaCode").style.height = "20%";
					document.getElementById("textareaCode").style.position = "absolute";
					document.getElementById("textareaCode").style.bottom = "5px";
					document.getElementById("textareaCode").style.height = "20%";
					document.getElementById("textareaCode").style.position = "absolute";

			
			}
			}
	
		
	}
	
	if (event.keyCode == 118) {
		if ( ecranHorizontal ) {
			var scale = 1.7
			
			var hauteurV = window.innerHeight*0.79/scale
			var largeurV = window.innerWidth/scale
			$("#iframecontainer").css('height',hauteurV);			
			$("#iframecontainer").css('width',largeurV);	

			document.getElementById("iframecontainer").style.top = "auto";
			
					
			
			console.log("Gauche : "+$("#iframecontainer").position().left);
			
			var g1 = $("#iframecontainer").position().left
			
			$("#iframecontainer").css("transform","scale("+scale+")");
			
			console.log("Gauche : "+$("#iframecontainer").position().left);
			
			var g2 = $("#iframecontainer").position().left;
			var haut = -$("#iframecontainer").position().top;
			
			

			$("#iframecontainer").css('left',(g1-g2)+"px");
			$("#iframecontainer").css('top',haut+"px");
			
			console.log("Gauche : "+$("#iframecontainer").position().left);
			
			
			document.getElementById("textareacontainer").style.width = "100%";
			
					
			
			
			
			
			//$('#textareacontainer').css('height','20%');
			var marge = $("#iframecontainer").height()*scale;
			$('#textareacontainer').css('margin-top',marge);
			var hauteurCode = window.innerHeight*0.2;
			$(".CodeMirror").css('height',hauteurCode);
			
			document.getElementById("textareaCode").style.position = "absolute";
			document.getElementById("textareaCode").style.bottom = "5px";
			
			//document.getElementById("textareaCode").style.top = "auto";
			
			
			
			ecranHorizontal = false;
			}
			else {
				$("#iframecontainer").css("transform","scale(1)");
				document.getElementById("iframecontainer").style.top = "40px";
				document.getElementById("iframecontainer").style.height = "100%";
				
				$("#iframecontainer").css('left',"50%");
				$("#iframecontainer").css('width',(window.innerWidth/2)+"px");
				
				console.log("Normal : "+$("#iframecontainer").position().left);
				console.log("Normal : "+window.innerWidth/2);
				
				var largeurE = window.innerWidth/2;
				//$("#iframecontainer").css({left: largeurE, top: 40 });
				
				$(".CodeMirror").css('height','100%');
				$('#textareacontainer').css('margin-top',"40px");
				document.getElementById("textareacontainer").style.width = "50%";
				document.getElementById("textareaCodeDebut").style.height = "100%";
				document.getElementById("textareaCode").style.height = "100%";
				document.getElementById("textareaCode").style.position = "absolute";
				document.getElementById("textareaCode").style.bottom = "10px";
				document.getElementById("textareaCode").style.top = "0px";
				
				
				ecranHorizontal = true;
			}
			
	
		
	}
	
	
	if (event.keyCode == 119) {
		if ( afficheMenu ) {
			document.getElementById("menu-demo2").style.display = "none";
			
			afficheMenu = false;
			}
			else {
				document.getElementById("menu-demo2").style.display = "block";
				afficheMenu = true;
			}
	
		
	}
	
	sessionStorage.setItem("contenu", document.getElementById("textareaCode").value );
	//submitTryit();
	//console.log( sessionStorage.getItem("contenu")  );
	
	
		
},true);






$("tabvar").each(function (i) {
	
	
	
	var nb = i+1;
	var nomTab = 'tabVar'+i;
	
	var nomTabJQ = "#"+nomTab;
	var contenuTab = "<table class='var' id='"+nomTab+"'>";
	
	
	var abs = $(this).children("abs");
	var classe,contenu;
	var casier = abs.children("casier");
	var nbCases = casier.length;
	
	
	
	contenuTab += "<tr>";
	
	for (var j=1;j<=nbCases;j++) {
		if ( j == 1) { classe = "droite"; } else { classe = "bas"; }
		contenu = $(this).children("abs").children("casier:nth-child("+j+")").html();
		
		contenuTab += "<td class='"+classe+"'>"+contenu+"</td>";
	}
	contenuTab += "</tr>";
	
	var signe = $(this).children("signe");
	
	
	if (signe.length>0) {
		for (var nbSigne=2;nbSigne<=signe.length+1;nbSigne++) {
			contenuTab += "<tr>";
			
			for (var j=1;j<=nbCases;j++) {
				if ( j == 1) { classe = "droite"; } else { classe = "bas"; }
				contenu = $(this).children("signe:nth-child("+nbSigne+")").children("casier:nth-child("+j+")").html();
				if ( contenu == "0") { classe="verticale";contenu = "0"; }
				if ( contenu == "interdit") { classe="interdit";contenu = ""; }
				if ( contenu == "barre") { classe="verticale";contenu = ""; }
		
				contenuTab += "<td class='"+classe+"'>"+contenu+"</td>";
			}
			contenuTab += "</tr>";
		}
	}
	
	var varHaut = $(this).children("varHaut");
	
	if (varHaut.length>0) {
	
		contenuTab += "<tr>";
	
		for (var j=1;j<=nbCases;j++) {
			if ( j == 1) { classe = "droite_seule"; } else { classe = "vh"; }
			contenu = $(this).children("varHaut").children("casier:nth-child("+j+")").html();
		
			if ( contenu == "interdit") { classe="interdit_sf";contenu = ""; }
		
			contenuTab += "<td class='"+classe+"'>"+contenu+"</td>";
		}
		contenuTab += "</tr>";
	}
	
	
	
	var varCentre = $(this).children("varCentre");
	
	if (varCentre.length>0) {
		contenuTab += "<tr>";	
		for (var j=1;j<=nbCases;j++) {
			if ( j == 1) { classe = "droite_seule"; } else { classe = ""; }
			contenu = $(this).children("varCentre").children("casier:nth-child("+j+")").html();		
			if ( contenu == "interdit") { classe="interdit_sf";contenu = ""; }
			if ( contenu == "croissante") { classe="croissante";contenu = "";}
			if ( contenu == "décroissante") { classe="decroissante";contenu = "";}		
			contenuTab += "<td class='"+classe+"'>"+contenu+"</td>";
		}
		contenuTab += "</tr>";
	}
	
	
	var varBas = $(this).children("varBas");
	
	if (varBas.length>0) {	
		contenuTab += "<tr>";
		
		for (var j=1;j<=nbCases;j++) {
			if ( j == 1) { classe = "droite_seule"; } else { classe = ""; }
			contenu = $(this).children("varBas").children("casier:nth-child("+j+")").html();			
			if ( contenu == "interdit") { classe="interdit";contenu = ""; }			
			contenuTab += "<td class='"+classe+"'>"+contenu+"</td>";
		}
		contenuTab += "</tr>";
	}	
	contenuTab += "</table>";
		
	$(this).after(contenuTab);
	contenuTab = "";
	
}
);

	
}
);





 




function decreaseHint() {
	hint--
	if ( hint == 0) {
		submitTryit()
	}
}

function submitTryit() {
	
	
	var scrollPos = 0;
	var texteI = document.getElementById("textareaCodeDebut").value;
	var codeSaisi = editor.getValue();
	
	
	if ( document.getElementById("iframeResult") ){
		scrollPos = $("#iframeResult").contents().scrollTop()  ;
		$("algo").each(function(i) { scrollPos += 750 });
		$("algoGraphe").each(function(i) { scrollPos += 750 });
		$("algoGrapheInv").each(function(i) { scrollPos += 350 });
	}
	
	
	texteI = texteI + codeSaisi;
	texteI = texteI + "<script>setTimeout(function (){window.scrollTo(0,"+scrollPos+")},100)</script>";
	var ifr = document.createElement("iframe");
  	ifr.setAttribute("frameborder", "0");
  	ifr.setAttribute("id", "iframeResult");  
  	
   
  	document.getElementById("iframewrapper").innerHTML = "";
	document.getElementById("iframewrapper").appendChild(ifr);
	var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;


	ifrw.document.open();
 	ifrw.document.write(texteI); 
  	ifrw.document.close();
  	
  	orientationEcran();
}






function copieDuTexte() {
	
	var copyText = document.querySelector("#textareaCode");
	
	var pos = document.getElementById("textareaCode").selectionStart;
  	copyText.select();
  	document.execCommand("Copy");
	copyText.setSelectionRange(pos,pos);
	
}

function insertText(data1,data2) {
	var cm = $(".CodeMirror")[0].CodeMirror;
	var doc = cm.getDoc();
	var cursor1 = doc.getCursor(true);
	var cursor2 = doc.getCursor(false);
	var line = doc.getLine(cursor1.line); // get the line contents
	var pos = {
		line: cursor1.line
	};
	
	console.log(cm.getCursor());
	doc.replaceRange(data2, cursor2);
	cm.focus();
	cm.setCursor( cm.getCursor().line, cm.getCursor().ch - data2.length )
	doc.replaceRange(data1, cursor1);
}

function insertTag(startTag,endTag,textareadId){
	
	var field = document.getElementById(textareadId);
	var scroll = field.scrollTop;
	field.focus();
	var startSelection = field.value.substring(0,field.selectionStart);
	var currentSelection = field.value.substring(field.selectionStart,field.selectionEnd);
	var endSelection = field.value.substring(field.selectionEnd);
	field.value = startSelection + startTag + currentSelection + endTag + endSelection;
	field.focus();
	field.setSelectionRange(startSelection.length + startTag.length, startSelection.length + startTag.length + currentSelection.length);
	field.scrollTop = scroll;
	}

var boule = true;




function zoneTabVar() {
	document.getElementById("tabVar").style.visibility = "visible";
}

function annuleVar() {
	document.getElementById("tabVar").style.visibility = "hidden";
}

function s11() {
	
	
	var textTab = '<tabvar>\n\t<abs>\n\t\t<casier>$x$</casier>\n\t\t<casier>$-\\infty$</casier>\n\t\t<casier></casier>\n\t\t<casier>$+\\infty$</casier>\n\t</abs>';
	textTab = textTab + '\n\t<signe>\n\t\t<casier>$f(x)$</casier>\n\t\t<casier></casier>\n\t\t<casier>$+$</casier>\n\t\t<casier></casier>\n\t</signe>';
	
	textTab = textTab + '\n</tabvar>';
	
	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}


function s12() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$0$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	
	textTab = textTab + '\n</tabvar>';
	
	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}


function s13() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	
	textTab = textTab + '\n</tabvar>';

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}


function s33() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>barre</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$g(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>barre</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$h(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	
	textTab = textTab + '\n</tabvar>';
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}

function v11() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}


function v11s() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}




function v12() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$0$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$8$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}

function v22() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$0$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$8$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}


function v13() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$4$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$10$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$5$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}




function v13i() {

	var textTab = '<tabvar>';
		textTab = textTab + '\n\t<abs>';
		textTab = textTab + '	\n\t\t<casier>$x$</casier>';
		textTab = textTab + '	\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$0$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t</abs>';
		textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$0$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>interdit</casier>';
		textTab = textTab + '	\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
			textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>décroissante</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>interdit</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>décroissante</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t</varCentre>';
		textTab = textTab + '\n\t<varBas>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
			textTab = textTab + '\n\t\t<casier>interdit</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$0$</casier>';
		textTab = textTab + '\n\t</varBas>';
	textTab = textTab + '</tabvar>';

insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}




function v23i() {

	var textTab = '<tabvar>';
		textTab = textTab + '\n\t<abs>';
		textTab = textTab + '	\n\t\t<casier>$x$</casier>';
		textTab = textTab + '	\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$0$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t</abs>';
		textTab = textTab + '\n\t<signe>';
			textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$-$</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>interdit</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$-$</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t</signe>';
		textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>$0$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier>interdit</casier>';
		textTab = textTab + '	\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
		textTab = textTab + '	\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
			textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>décroissante</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>interdit</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>décroissante</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t</varCentre>';
		textTab = textTab + '\n\t<varBas>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
			textTab = textTab + '\n\t\t<casier>interdit</casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier></casier>';
			textTab = textTab + '\n\t\t<casier>$0$</casier>';
		textTab = textTab + '\n\t</varBas>';
	textTab = textTab + '</tabvar>';

insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}







function v21() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';	
	
	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
	
}



function v21vi() {
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>interdit</casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';	
	
	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
	
}


function v23() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$4$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$10$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$5$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}

function v43() {
	
	
	var textTab = '<tabvar>';
	textTab = textTab + '\n\t<abs>';
		textTab = textTab + '\n\t\t<casier>$x$</casier>';
		textTab = textTab + '\n\t\t<casier>$-\\infty$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$1$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+\\infty$</casier>';
	textTab = textTab + '\n\t</abs>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>barre</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>barre</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<signe>';
		textTab = textTab + '\n\t\t<casier>$f\'(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$+$</casier>';
		textTab = textTab + '\n\t\t<casier>0</casier>';
		textTab = textTab + '\n\t\t<casier>$-$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</signe>';
	textTab = textTab + '\n\t<varHaut>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$4$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$10$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varHaut>';
	textTab = textTab + '\n\t<varCentre>';
		textTab = textTab + '\n\t\t<casier>$f(x)$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>croissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>décroissante</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
	textTab = textTab + '\n\t</varCentre>';
	textTab = textTab + '\n\t<varBas>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$5$</casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier></casier>';
		textTab = textTab + '\n\t\t<casier>$-1$</casier>';
	textTab = textTab + '\n\t</varbas>';
	
	textTab = textTab + '\n</tabvar>';
	
	
	

	insertText(textTab,'','textareaCode');
	
	
	document.getElementById("tabVar").style.visibility = "hidden";
}

var boule4 = true;

function afficheGraphe() {
	
	if (boule4) {
		document.getElementById("graphePlus").style.visibility = "visible";
		}
	else {document.getElementById("graphePlus").style.visibility = "hidden";
	}	
	boule4 = !boule4;
}




function graphe() {
	
	var k = Math.round( 10000*Math.random() );
	
	var textTab = '<form style="width:100%;padding:10px;text-align:left;">';
	textTab = textTab + '\n fonction <input type="text" id="input" value="" size="2">';
	textTab = textTab + '\n x min <input type="text" id="xmin" value="-8" size="1">';
	textTab = textTab + '\n x max <input type="text" id="xmax" value="8" size="1">';
	textTab = textTab + '\n y min <input type="text" id="ymin" value="-5" size="1">';
	textTab = textTab + '\n y max <input type="text" id="ymax" value="5" size="1">';
	textTab = textTab + '\n<input type="button" value="Tracer" onClick="plotter()">';
	textTab = textTab + '\n<input type="button" value="Effacer" onClick="clearAll()">';;
	textTab = textTab + '\n</form>';

	textTab = textTab + '\n<div id=\'jxgboxpl'+ k +'\' class=\'jxgbox\' style=\'width:600px; height:400px;margin:auto;margin-top:20px;margin-bottom:40px;\'></div>\n<script type=\'text/javascript\'>';
	textTab = textTab + '\n var board = JXG.JSXGraph.initBoard(\'jxgboxpl'+k+'\', {boundingbox:[-8,5,8,-5], axis:true,showCopyright:false});';
	textTab = textTab + '\n var f, curve; ';

	textTab = textTab + '\nfunction plotter() {';
		textTab = textTab + '\n\t var xmin = document.getElementById(\'xmin\').value;';
		textTab = textTab + '\n\t var xmax = document.getElementById(\'xmax\').value;';
		textTab = textTab + '\n\t var ymin = document.getElementById(\'ymin\').value;';
		textTab = textTab + '\n\t var ymax = document.getElementById(\'ymax\').value;';
  		textTab = textTab + '\n\t var txtraw = document.getElementById(\'input\').value;';
  		textTab = textTab + '\n\t board.setBoundingBox([xmin, ymax, xmax, ymin]);';
  		textTab = textTab + '\n\t f = board.jc.snippet(txtraw, true, \'x\', true);';
  		textTab = textTab + '\n\t curve = board.create(\'functiongraph\',[f,';
               textTab = textTab + '\n\t\t function(){ ';
                  textTab = textTab + '\n\t\t var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],board);';
                  textTab = textTab + '\n\t\t return c.usrCoords[1];';
                textTab = textTab + '\n\t\t},';
                textTab = textTab + '\n\t\t function(){ ';
                  textTab = textTab + '\n\t\t var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);';
                  textTab = textTab + '\n\t\t return c.usrCoords[1];';
                textTab = textTab + '\n\t\t}';
              textTab = textTab + '\n\t\t],{name:txtraw, withLabel:true});';
  		textTab = textTab + '\n\t var q = board.create(\'glider\', [2, 1, curve], {withLabel:false});';
		textTab = textTab + '\n\t}';

	textTab = textTab + '\n function clearAll() {';
    	textTab = textTab + '\n\t JXG.JSXGraph.freeBoard(board);';
    	textTab = textTab + '\n\t board = JXG.JSXGraph.initBoard(\'jxgboxpl\', {boundingbox:[-5,8,8,-5], axis:true});';
   	 textTab = textTab + '\n\t f = null;';
    	textTab = textTab + '\n\t curve = null;';
		textTab = textTab + '\n\t}';
	
textTab = textTab + '\n</script';

	
	
	insertText(textTab,'>','textareaCode');
	afficheGraphe();
}

function simpleGraphe() {
	
	var k = Math.round( 10000*Math.random() );
	var textTab = '<div id=\'box'+ k +'\' class=\'jxgbox\' style=\'width:600px; height:400px;margin:auto;margin-top:20px;margin-bottom:40px;\'></div>\n';
	textTab = textTab + '\n';
	textTab = textTab + '<script type="text/javascript">\n';
	textTab = textTab + '\t board = JXG.JSXGraph.initBoard(\'box'+k+'\',{axis:true,boundingbox:[-8,5,8,-5], showCopyright:false});\n';
	textTab = textTab + '\t <!--boundingbox:[xmin,ymax,xmax,-ymin]-->\n';
	textTab = textTab + '\t board.create(\'functiongraph\', [function(x){return Math.sin(x);},-Math.PI,2*Math.PI],{strokeColor:\'red\'});\n';
	
	textTab = textTab + '</script';
	
	insertText(textTab,'>','textareaCode');
	afficheGraphe();
}







var boule2 = true;

function plusMaths() {
	

	if (boule2) {
		document.getElementById("mathsPlus").style.visibility = "visible";
		
		}
	else {document.getElementById("mathsPlus").style.visibility = "hidden";
	}	
	boule2 = !boule2;
}
	
var boule3 = true;

function zoneEdit() {

	if (boule3) {	
		$( ".iframecontainer" ).css( "width", "100%" );
		$("#boutonNoir").css("left","0%");		
		}
	else {
		$( ".iframecontainer" ).css( "width", "50%" );
		$("#boutonNoir").css("left","50%");	
		}	
	boule3 = !boule3;
}


var boule5 = true;

function zoneSVG() {

	if (boule5) {
		document.getElementById("svg").style.visibility = "visible";
		}
	else {document.getElementById("svg").style.visibility = "hidden";
	}	
	boule5 = !boule5;
}

function save() {
	nomFichier = document.getElementById("nomFich").value;
	var contenu = $("#textareaCodeDebut").val();
	var codeSaisi = editor.getValue();
	contenu = contenu + codeSaisi;
	contenu = contenu + "";
	
	var nom_de_fichier = nomFichier;
	download(new Blob([contenu]), nom_de_fichier, "text/html");
	
	var elt = document.getElementById("sauvegarde");
	elt.style.display = "none";
}


function sauverFichier() {
	var elt = document.getElementById("sauvegarde");
	elt.style.display = "block";
	var champs = document.getElementById("nomFich");
	champs.focus();
	champs.value = nomFichier;
	champs.setSelectionRange(0,0);
}


function annuleSauver() {
	var elt = document.getElementById("sauvegarde");
	elt.style.display = "none";
}


function sauverFocus() {
	var champs = document.getElementById("nomFich");
	champs.focus();
}

function sauvegardeFichier() {
	var contenu = $("#textareaCodeDebut").val();
	var codeSaisi = editor.getValue();
	contenu = contenu + codeSaisi;
	contenu = contenu + "";
	
	var nom_de_fichier = document.getElementById("nomFich").value;
	
	let a = document.createElement('a');
	a.href = "data:application/octet-stream,"+encodeURIComponent( contenu );
	a.download = nom_de_fichier;
	a.click();
	nomFichier = nom_de_fichier;

	annuleSauver();
	
}



function nouveauFichier() {
	let a = document.createElement('a');
	a.href = "https://www.sarmate.xyz/mathpad_doc_v3.0.1/mathpad_doc_3.0.1.html";
	a.target = "_blank";
	a.click();
}


function sauve() { 
 	var contenu = $("#textareaCodeDebut").val();
 	var codeSaisi = editor.getValue();
	contenu = contenu + codeSaisi;
	contenu = contenu + "";
      
   contenu = contenu.replace(/\+/g, '+'); 
	contenu = contenu.replace(/\&/g, '&'); 
	contenu = contenu.replace(/\#/g, '#');
	
	$('#mess_sauve').load('save.php',{
			'adr' : getParam('adr').replace(/\#/g,''),
			'fichier_html' : contenu
			}
	
	);
	$('#mess_sauve').css('display','block');
	
	setTimeout( function () {
		$('#mess_sauve').fadeTo("slow",0);
	},2000 );
	
	setTimeout( function () {
		$('#mess_sauve').css('display','none');
		$('#mess_sauve').css('opacity','1');
	},3000 );
}





/* Open File */

function openFile() {
  document.getElementById('inp').click();
}
function readFile(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.fileName = file.name;
  reader.onload = function(e) {
    var cm = $(".CodeMirror")[0].CodeMirror;
    cm.getDoc().setValue( e.target.result )
    
    nomFichier = e.target.fileName;
  }
  reader.readAsText(file)
}




// INSERTION IMAGE -----------------------------------------------------------------------------------------

function insIMG() {
	document.getElementById('inp2').click();
}
function readFileIMG(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.fileName = file.name;
  reader.onload = function(e) {
  		var donnees = e.target.result;
		var numCanvas = Math.floor(1000*Math.random());
		var codeInsert = "<img id=\"img"+numCanvas+"\"  style=\"width:350px;display: block;margin: auto;margin-top: 10px;margin-bottom: 10px;\"/>\n"
		codeInsert += "<script>\n"
		codeInsert += "var img = document.getElementById(\"img"+numCanvas+"\");\n";
		codeInsert += "img.src = \""+donnees+"\";\n";
		codeInsert += "\n";
		codeInsert += "\n";
		codeInsert += "</script>"
		insertText(codeInsert,'','textareaCode')
		var tabPosition = editor.getCursor();
	
		var xP = tabPosition.line-5
		editor.foldCode( CodeMirror.Pos( xP,0 ) );
  }
  reader.readAsDataURL(file)
}

// FIN INSERTION IMAGE -----------------------------------------------------------------------------------------






function afficheTableur() {
	
	var numId = Math.floor(1000*Math.random());
	var texte = '<div class="gridContainer">\n<div id="demo'+numId+'"></div>\n</div>\n';
	texte += '<style>\n#demo'+numId+'{\n\t height: 350px;\n\t width: 500px;\n\t margin: auto;\n}\n</style>\n';
	texte += '<script>\n';
	texte += '$("#demo'+numId+'").ip_Grid({ rows: 101,  cols: 26 });\n';
	texte += '//$("#demo'+numId+'").ip_CellInput({ valueRAW:\'=randint(100,500)\', range:[{ startRow:1, startCol:0, endRow:100, endCol:0 }] });\n';
	texte += '//$("#demo'+numId+'").ip_CellInput({ valueRAW:\'=sum(a1:a100)/100\', row: 1, col: 1 });\n';
	texte += '//$("#demo'+numId+'").ip_CellInput({ valueRAW:\'100 lancés d\\\'un dé à 6 faces\', range:[{ startRow:0, startCol:0, endRow:0, endCol:0 }] });\n';
	texte += '//$("#demo'+numId+'").ip_ResizeColumn({ columns: [0], size: 250 });\n';
	texte += '//$("#demo'+numId+'").ip_FormatCell({ style:\'background-color:rgb(200,200,255);\',range:[{ startRow:0, startCol:0, endRow:0, endCol:0 }] });\n';
	texte += '</script>';
	
	insertText(texte,'','textareaCode')


}







function addPygame() {

	var text = "<!-- JQuery -->\n<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js\"></script>\n";
	text += "<!-- Pygame : après l'import de JQuery + version locale de Skulpt-->\n<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.1.1/css/all.css\"";
   text += " integrity=\"sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ\" crossorigin=\"anonymous\">\n";
	text += "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n";
	text += "<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n";
	
	text += "<!-- Python with Skulp -->\n<script src=\"https://www.sarmate.xyz/skulpt_dist/skulpt.min.js\" type=\"text/javascript\"></script>\n";
	text +="<script src=\"https://www.sarmate.xyz/skulpt_dist/skulpt-stdlib.js\" type=\"text/javascript\"></script>";

	insertText(text,'','textareaCode');




}



















