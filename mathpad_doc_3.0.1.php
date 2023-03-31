<!-- 
Mathpad Doc est une application permettant de créer des pages web à vocation scientifique.
Copyright (C) 2016  Frattini Fabrice

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.



!-->


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Mathpad v3.0.1</title>



<meta charset="utf-8" />
<meta name="viewport" content="width=device-width">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="trystyle.css">





<!-- MathJax-->
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<!-- JQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>

<!-- JSX Graph-->
<link rel="stylesheet" type="text/css" href="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraph.css" />
<script type="text/javascript" src="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"></script>




<script src="mathpad_doc_3.0.1.js"></script>



<!-- CodeMirror -->


<link rel=stylesheet href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/doc/docs.css">
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/lib/codemirror.js"></script>
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/lib/codemirror.css">
<link rel="stylesheet" href="chttps://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/foldgutter.css">
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/xml/xml.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/dialog/dialog.js"></script>
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/dialog/dialog.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/search/matchesonscrollbar.css">
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/search/searchcursor.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/search/search.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/scroll/annotatescrollbar.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/search/matchesonscrollbar.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/search/jump-to-line.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/foldcode.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3//addon/fold/foldgutter.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/brace-fold.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/xml-fold.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/htmlmixed/htmlmixed.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/indent-fold.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/markdown-fold.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/addon/fold/comment-fold.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/javascript/javascript.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/xml/xml.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/css/css.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/python/python.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/markdown/markdown.js"></script>
</head>

<body>



<div id="sauvegarde">

<div id="nomFichier">

Nom du fichier : <input type="text" id="nomFich" name="nomFich"  size="30" onclick="sauverFocus()"/>


<div style="margin-top: 20px;">
<button  onclick="sauvegardeFichier()">Sauvegarder</button> <button onclick="annuleSauver()">Annuler</button>
</div>
</div>

</div>

<script>
$( function() {
    $( "#nomFichier" ).draggable({cancel: 'p'}).resizable();
    
  } );
</script>



<ul id="menu-demo2">
	<li class="puce"><a href="#">Fichier</a>
		<ul>
			<li><a><button title="Nouveau" class="boutonBlanc" onclick="nouveauFichier()">Nouveau</button></a></li>
			<li><a><button title="Ouvrir" class="boutonBlanc" onclick="openFile()">Ouvrir</button> <input id="inp" type='file' style="display: none;" onchange="readFile(event)" /> </a></li>
			<li><a><button title="Sauvegarder" class="boutonBlanc" onclick="sauverFichier()">Sauver</button></a></li>
		</ul>
	</li>

	<li class="puce"><a href="#">Texte</a>
		<ul>
			<li><a href="#" onclick="insertText('<rouge>','</rouge>')"><button class="boutonR" type="button">&nbsp;&nbsp;&nbsp;</button></a></li>
			<li><a href="#" onclick="insertText('<vert>','</vert>','textareaCode')"><button class="boutonV" type="button">&nbsp;&nbsp;&nbsp;</button></a></li>
			<li><a href="#" onclick="insertText('<bleu>','</bleu>','textareaCode')"><button class="boutonB" type="button">&nbsp;&nbsp;&nbsp;</button></a></li>
			<li><a href="#" onclick="insertText('<gris>\n','\n</gris>','textareaCode')">Zone grise</a></li>
			<li><a href="#" onclick="insertText('<souligne>','</souligne>','textareaCode')"><button class="boutonUnderline" type="button">S</button></a></li>
			<li><a href="#" onclick="insertText('<gras>','</gras>','textareaCode')"><button class="boutonGras" type="button">G</button></a></li>
			<li><a href="#" onclick="insertText('<italic>','</italic>','textareaCode')"><button class="boutonIt" type="button">I</button></a></li>
			<li><a href="#" onclick="insertText('<centre>','</centre>','textareaCode')"><button class="boutonBlanc" type="button">C</button></a></li>
			<li><a href="#" onclick="insertText('<br />\n','','textareaCode')"><button class="boutonBlanc" type="button">&#8626;</button></a></li>
			<li><a href="#" onclick="insertText('<span style=\'border:solid 3px red;border-radius:8px;padding:20 5 20 5;\'>\n','\n</span>','textareaCode')"><button class="boutonBlancRouge" type="button">&#9744;</button></a></li>
			<li><a href="#" onclick="insertText('<esp>1</esp>','','textareaCode')"><button class="boutonBlanc" type="button">&#9141;</button></a></li>
			<li><a href="#" onclick="insertText('&laquo; ',' &raquo;','textareaCode')"><button class="boutonBlanc" type="button">&laquo; &raquo;</button></a></li>
			<li><a href="#" onclick="insertText('<div style=\'page-break-after: always\'></div>','','textareaCode')"><button class="boutonBlanc" type="button">Saut de page</button></a></li>
			<li><a href="#" onclick="insertText('<div style=\'display: flex; justify-content: center;\'>\n','\n</div>','textareaCode')"><button class="boutonBlanc" type="button">Centre</button></a></li>
		</ul>
	</li>
	
	<li class="puce"><a href="#">Structures</a>
		<ul>
			<li><a href="#" onclick="insertText('<cadre>','</cadre>','textareaCode')">Cadre</a></li>
			<li><a href="#" onclick="insertText('<titre>','</titre>','textareaCode')">Titre</a></li>
			<li><a href="#" onclick="insertText('<exemple>','</exemple>','textareaCode')">Exemple</a></li>
			<li><a href="#" onclick="insertText('<exercice>','</exercice>','textareaCode')">Exercice</a></li>
			<li><a href="#" onclick="insertText('<prop>','</prop>','textareaCode')">Propriété</a></li>
			<li><a href="#" onclick="insertText('<def>','</def>','textareaCode')">Définition</a></li>
			<li><a href="#" onclick="insertText('<rem>','</rem>','textareaCode')">Remarque</a></li>
			<li><a href="#" onclick="insertText('<paragraphe>','</paragraphe>','textareaCode')">Paragraphe</a></li>
			<li><a href="#" onclick="insertText('<subparagraphe>','</subparagraphe>','textareaCode')">SubParagraphe</a></li>
			<li><a href="#" onclick="insertText('<slide>\n','\n</slide>','textareaCode')">Slide</a></li>
			<li><a href="#" onclick="insertText('<pause>','</pause>','textareaCode')">Pause</a></li>
			<li><a href="#" onclick="insertText('<ol>\n','\n</ol>','textareaCode')">Menu 1-2-3</a></li>
			<li><a href="#" onclick="insertText('<ol style=\'list-style-type: lower-latin;\'>\n','\n</ol>','textareaCode')">Menu a-b-c</a></li>
			<li><a href="#" onclick="insertText('<li>\n','\n</li>','textareaCode')">Item de menu</a></li>
			<li><a href="#" onclick="insertText('<legende>\n','\n</legende>','textareaCode')">Légende</a></li>
			<li><a href="#" onclick="insertText('<correction>\n','\n</correction>','textareaCode')">Correction</a></li>
			<li><a href="#" onclick="insertText('<input type=\'checkbox\'>','','textareaCode')">Case à cocher</a></li>
			
		</ul>
	</li>
	<li class="puce"><a href="#">Code</a>
		<ul>
			<li><a href="#" onclick="afficheTableur()">Tableur</a></li>
			<li><a href="#" onclick="insertText('<algoGraphe>\n','\n</algoGraphe>','textareaCode')">Algo Graph</a></li>
			<li><a href="#" onclick="insertText('<codeHTML>\n<css>\n</css>\n\n<page>\n\</page>','\n</codeHTML>','textareaCode')">Zone code html</a></li>
			<li><a href="#" onclick="insertText('<python>\n','\n</python>','textareaCode')">Zone code Python</a></li>
			<li><a href="#" onclick="insertText('<pythonImpr>\n','\n</pythonImpr>','textareaCode')">Zone de code</a></li>
		</ul>
	</li>
	<li class="puce"><a href="#">Maths</a>
		<ul>
			<li><a href="#" onclick="insertText('$','$','textareaCode')">$$</a></li>
			<li><a href="#" onclick="insertText('\\dfrac{}{}','','textareaCode')">a/b</a></li>
			<li><a href="#" onclick="insertText('\\lim_{x\\rightarrow}','','textareaCode')">lim</a></li>
			<li><a href="#" onclick="insertText('\\sum_{}^{}','','textareaCode')">sum</a></li>
			<li><a href="#" onclick="insertText('\\displaystyle{','}','textareaCode')">\displaystyle</a></li>
			<li><a href="#" onclick="insertText('\\begin{array}{rcl}\n\n','\\end{array}','textareaCode')">array</a></li>
			<li><a href="#" onclick="insertText('<table>\n\t<tr>\n\t\t<td style=\'text-align: right;\'>\n\t\t</td>\n\t\t<td>\n\t\t\t $=$ \n\t\t\t</td>\n\t\t<td>\n\t\t</td>\n\t</tr>\n</table>','','textareaCode')">ar. html</a></li>
			 
			<li><a href="#" onclick="insertText('\\int_{}^{}','','textareaCode')">&#8747;</a></li>
			<li><a href="#" onclick="insertText('\\begin{pmatrix}\n','\n\\end{pmatrix}','textareaCode')">&#9638;</a></li>
			<li><a href="#" onclick="plusMaths()">...</a></li>
			
			
		</ul>
	</li>
	<li class="puce"><a href="#">Outils</a>
		<ul>
			<li><a href="https://www.sarmate.xyz/tableau.html" target="_blank" >▦</a></li>
			<!--<li><a href="#" onclick="afficheGraphe();"><img src="img/courbe.png"  style="height:15px;width:18px;"/></a></li>-->
			<li><a href="#" onclick="zoneTabVar();">&#8599;&#8600;</a></li>
			<li><a href="https://www.sarmate.xyz/exemples_jsxgraph.html" target="_blank">JSX Graph</a></li>
			<li><a href="pst_to_jsx.html" target="_blank">PST -> JSX</a></li>
			<li><a href="#" onclick="zonePaint();">&#10000</a></li>
			<li><a href="#" onclick="zoneJSX();">&#10000; -> JSX</a></li>
			<li><a href="#" onclick="insIMG();">Insérer une image</a></li> <input id="inp2" type='file' accept="image/png, image/jpeg" style="display: none;" onchange="readFileIMG(event)" /> </a></li>
		</ul>
	</li>
	
	<li class="puce"><a href="#">Raccourcis</a>
		<ul>
			<li><a href="#" onclick="submitTryit()">Afficher f2 ou Ctrl+Espace</a></li>
			<li><a href="#" onclick="">Plein écran f4</a></li>
			<li><a href="#" onclick="">Horizontal/vertical f7</a></li>
			<li><a href="#" onclick="">Menu f8</a></li>
		</ul>
	</li>
	
	<li  id="run" onclick="submitTryit()"  onmouseover = "bulle('Afficher la page web (ctrl+esp')" onmouseout="debulle()">&#9654;
		
	</li>

</ul>





<div class="container">




<!-- Début gauche -->
<div id="textareacontainer">
<div class="textarea">
<div class="textareawrapper">
      
<textarea autocomplete="off" class="code_input" id="textareaCodeDebut" wrap="logical" spellcheck="false" style="display:none;"></textarea>      
      
      
<textarea autocomplete="on" class="code_input" id="textareaCode" wrap="hard" spellcheck="false">
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title></title>

<!-- JSX Graph-->
<link rel="stylesheet" type="text/css" href="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraph.css" />
<script type="text/javascript" src="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"></script>

<!-- JQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<!-- Python with Skulp -->
<script src="https://skulpt.org/js/skulpt.min.js" type="text/javascript"></script> 
<script src="https://skulpt.org/js/skulpt-stdlib.js" type="text/javascript"></script> 

<!-- IP Grid -->
<script src="https://www.sarmate.xyz/ipgrid/scripts/jquery-ui-1.9.2.custom.min.js"></script>    
<script src="https://www.sarmate.xyz/ipgrid/scripts/ip.grid.js"></script>
<link href="https://www.sarmate.xyz/ipgrid/css/ip.grid.css" rel="stylesheet" />


<!-- MathPad -->
<link rel="stylesheet" type="text/css" href="https://www.sarmate.xyz/mathpad/mathpad.css" />
<script type="text/javascript" src="https://www.sarmate.xyz/mathpad/mathpad.js"></script>

<!-- CodeMirror -->
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/lib/codemirror.js"></script>
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/lib/codemirror.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/theme/abcdef.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/theme/duotone-light.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/theme/mdn-like.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/theme/neat.css">
<link rel="stylesheet" href="https://www.sarmate.xyz/Cours/codemirror-5.58.3/theme/ttcn.css">
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/python/python.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/xml/xml.js"></script>
<script src="https://www.sarmate.xyz/Cours/codemirror-5.58.3/mode/javascript/javascript.js"></script>


<script>
var rouge = true;
//theme = 'classique';
//theme = 'dark';
//theme = 'green';
//theme = 'ellicio';
//theme = 'livio';
//theme = 'marseille';
//theme = 'sunshine';
//theme = 'ferrari';
//theme = 'black';
//theme = 'clair';
//theme = 'bonbon';
</script>


</head>
<body>



















<!-- Katex ------------------------------------------------------------------------>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.12.0/katex.min.js" ></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/contrib/auto-render.min.js" ></script>
<script>
renderMathInElement(
	document.body,
	{
		delimiters: [
			{left: "$$", right: "$$", display: true},
			{left: "$", right: "$", display: false}
		]
	}
);
</script>


</body>




</textarea>

          <form autocomplete="off" style="margin:0px;display:none;">
            <input type="hidden" name="code" id="code" />
            <input type="hidden" id="bt" name="bt" />
          </form>
          
       </div>

</div>
  </div>
  
<!-- fin gauche -->

<!-- Début droite --> 
  
  
  <div id="iframecontainer">
    <div class="iframe">
      <div style="overflow:auto;">
        <div class="headerText"></div>
      </div>
      <div id="iframewrapper" class="iframewrapper">
        
      </div>
    </div>
  </div>
     

<!-- Fin droite -->     
     

</div>




<!-- TAB VAR ------------------------------------------------------>
<div id="tabVar">

<button class="boutonGris" onclick="annuleVar();" style="margin-bottom:20px;">Annuler</button>

<table style="text-align:center;margin:auto;margin-bottom:50px;">
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="s11();">Signe 1x1</button>
</td>
<td class="caseBlanche">
<table class='var'>
	<tr>
		<td class='droite'>$x$</td>
		<td class='bas'>$-\infty$</td>
		<td class='bas'></td>
		<td class='bas'></td>
		<td class='bas'></td>
		<td class='bas'>$+\infty$</td>
	</tr>
	<tr>
		<td class='droite'>$f(x)$</td>
		<td class='bas'></td>
		<td class='bas'></td>
		<td class='bas'>+</td>
		<td class='bas'></td>
		<td class='bas'></td>
	</tr>
</table>
</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="s12();">Signe 1x2</button>
</td>
<td class="caseBlanche">

<table class='var'>
	<tr>
		<td class='droite'>$x$</td>
		<td class='bas'>$-\infty$</td>
		<td class='bas'></td>
		<td class='bas'>$0$</td>
		<td class='bas'></td>
		<td class='bas'>$+\infty$</td>
	</tr>
	<tr>
		<td class='droite'>$f(x)$</td>
		<td class='bas'></td>
		<td class='bas'>-</td>
		<td class='zero'></td>
		<td class='bas'>+</td>
		<td class='bas'></td>
	</tr>
</table>

</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="s13();">Signe 1x3</button>
</td>
<td class="caseBlanche">
<table class='var'>
<tr>
	<td class='droite'>$x$</td>
	<td class='bas'>$-\infty$</td>
	<td class='bas'></td>
	<td class='bas'>$-1$</td>
	<td class='bas'></td>
	<td class='bas'>$1$</td>
	<td class='bas'></td>
	<td class='bas'>$+\infty$</td>
</tr>
<tr>
	<td class='droite'>$f(x)$</td>
	<td class='bas'></td>
	<td class='bas'>+</td>
	<td class='zero'></td>
	<td class='bas'>-</td>
	<td class='zero'></td>
	<td class='bas'>+</td>
	<td class='bas'></td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="s33();">Signe 3x3</button>
</td>
<td>
<table class='var'>
<tr>
	<td class='droite'>$x$</td>
	<td class='bas'>$-\infty$</td>
	<td class='bas'></td>
	<td class='bas'>$-1$</td>
	<td class='bas'></td>
	<td class='bas'>$1$</td>
	<td class='bas'></td>
	<td class='bas'>$+\infty$</td>
</tr>
<tr>
	<td class='droite'>$f(x)$</td>
	<td class='bas'></td>
	<td class='bas'>+</td>
	<td class='verticale'></td>
	<td class='bas'>+</td>
	<td class='zero'></td>
	<td class='bas'>-</td>
	<td class='bas'></td>
</tr>
<tr>
	<td class='droite'>$g(x)$</td>
	<td class='bas'></td>
	<td class='bas'>-</td>
	<td class='zero'></td>
	<td class='bas'>+</td>
	<td class='verticale'></td>
	<td class='bas'>+</td>
	<td class='bas'></td>
</tr>
<tr>
	<td class='droite'>$h(x)$</td>
	<td class='bas'></td>
	<td class='bas'>-</td>
	<td class='zero'></td>
	<td class='bas'>+</td>
	<td class='zero'></td>
	<td class='bas'>-</td>
	<td class='bas'></td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v11();">Variation 1x1</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-\infty$</td>
	<td class="bas"></td>
	<td class="bas">$+\infty$</td>
</tr>
<tr>
	<td class="droite_seule"></td>
	
	<td></td>
	<td></td>
	<td>$+\infty$</td>
	
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	
	<td></td>
	<td class="croissante"></td>
	<td></td>
	
</tr>
<tr>
	<td class="droite_seule"></td>
	
	<td>$-\infty$</td>
	<td></td>
	<td></td>
	
</tr>
</table>
</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v11s();">Variation 1x1 (vi)</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-5$</td>
	<td class="bas"></td>
	<td class="bas"></td>
	<td class="bas"></td>
	<td class="bas">$5$</td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td class="interdit_sf"></td>
	<td></td>
	<td></td>
	<td>$+\infty$</td>
	<td class="interdit_sf"></td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td class="interdit_sf"></td>
	<td></td>
	<td class="croissante"></td>
	<td></td>
	<td class="interdit_sf"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td class="interdit"></td>
	<td>$-\infty$</td>
	<td></td>
	<td></td>
	<td class="interdit"></td>
</tr>
</table>


</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v12();">Variation 1x2</button>
</td>
<td>
<table class='var'>
<tr>
	<td class='droite'>$x$</td>
	<td class='bas'>$-\infty$</td>
	<td class='bas'></td>
	<td class='bas'>$0$</td>
	<td class='bas'></td>
	<td class='bas'>$+\infty$</td>
</tr>
<tr>
	<td class='droite_seule'></td>
	<td>$+\infty$</td>
	<td></td>
	<td></td>
	<td></td>
	<td>$+\infty$</td>
</tr>
<tr>
	<td class='droite_seule'>$f(x)$</td>
	<td></td>
	<td class='decroissante'></td>
	<td></td>
	<td class='croissante'></td>
	<td></td>
</tr>
<tr>
	<td class='droite_seule'></td>
	<td></td>
	<td></td>
	<td>8</td>
	<td></td>
	<td></td>
</tr>
</table>


</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v13();">Variation 1x3</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-\infty$</td>
	<td class="bas"></td>
	<td class="bas">$-1$</td>
	<td class="bas"></td>
	<td class="bas">$1$</td>
	<td class="bas"></td>
	<td class="bas">$+\infty$</td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td>4</td>
	<td></td>
	<td></td>
	<td></td>
	<td>10</td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td></td>
	<td class="decroissante"></td>
	<td class=""></td>
	<td class="croissante"></td>
	<td class=""></td>
	<td class="decroissante"></td>
	<td></td>
</tr>
<tr>
	<td class="droite"></td>
	<td></td>
	<td></td>
	<td>5</td>
	<td></td>
	<td></td>
	<td></td>
	<td>-1</td>
</tr>
</table>
</td>
</tr>


<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v13i();">Variation 1x3 vi</button>
</td>
<td>

<tabvar>
	<abs>
		<casier>$x$</casier>
		<casier>$-\infty$</casier>
		<casier></casier>
		<casier></casier>
		<casier>$0$</casier>
		<casier></casier>
		<casier></casier>
		<casier>$+\infty$</casier>
	</abs>
	<varHaut>
		<casier></casier>
		<casier>$0$</casier>
		<casier></casier>
		<casier></casier>
		<casier>interdit</casier>
		<casier>$+\infty$</casier>
		<casier></casier>
		<casier></casier>
	</varHaut>
	<varCentre>
		<casier>$f(x)$</casier>
		<casier></casier>
		<casier>décroissante</casier>
		<casier></casier>
		<casier>interdit</casier>
		<casier></casier>
		<casier>décroissante</casier>
		<casier></casier>
	</varCentre>
	<varBas>
		<casier></casier>
		<casier></casier>
		<casier></casier>
		<casier>$-\infty$</casier>
		<casier>interdit</casier>
		<casier></casier>
		<casier></casier>
		<casier>$0$</casier>
	</varBas>
</tabvar>

</td>
</tr>




<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v23i();">Variation 2x3 vi</button>
</td>
<td>

<tabvar>
	<abs>
		<casier>$x$</casier>
		<casier>$-\infty$</casier>
		<casier></casier>
		<casier></casier>
		<casier>$0$</casier>
		<casier></casier>
		<casier></casier>
		<casier>$+\infty$</casier>
	</abs>
	<signe>
		<casier>$f'(x)$</casier>
		<casier></casier>
		<casier>$-$</casier>
		<casier></casier>
		<casier>interdit</casier>
		<casier></casier>
		<casier>$-$</casier>
		<casier></casier>
	</signe>
	<varHaut>
		<casier></casier>
		<casier>$0$</casier>
		<casier></casier>
		<casier></casier>
		<casier>interdit</casier>
		<casier>$+\infty$</casier>
		<casier></casier>
		<casier></casier>
	</varHaut>
	<varCentre>
		<casier>$f(x)$</casier>
		<casier></casier>
		<casier>décroissante</casier>
		<casier></casier>
		<casier>interdit</casier>
		<casier></casier>
		<casier>décroissante</casier>
		<casier></casier>
	</varCentre>
	<varBas>
		<casier></casier>
		<casier></casier>
		<casier></casier>
		<casier>$-\infty$</casier>
		<casier>interdit</casier>
		<casier></casier>
		<casier></casier>
		<casier>$0$</casier>
	</varBas>
</tabvar>

</td>
</tr>







<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v21();">Variation 2x1</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-\infty$</td>
	<td class="bas"></td>
	<td class="bas">$+\infty$</td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="bas"></td>
	<td class="bas">+</td>
	<td class="bas"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td></td>
	<td></td>
	<td>$+\infty$</td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td></td>
	<td class="croissante"></td>
	<td></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td>$-\infty$</td>
	<td></td>
	<td></td>
</tr>
</table>


</td>
</tr>



<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v21vi();">Variation 2x1 (vi)</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-5$</td>
	<td class="bas"></td>
	<td class="bas"></td>
	<td class="bas"></td>
	<td class="bas">$5$</td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="interdit"></td>
	<td class="bas"></td>
	<td class="bas">+</td>
	<td class="bas"></td>
	<td class="interdit"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td class="interdit_sf"></td>
	<td></td>
	<td></td>
	<td>$+\infty$</td>
	<td class="interdit_sf"></td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td class="interdit_sf"></td>
	<td></td>
	<td class="croissante"></td>
	<td></td>
	<td class="interdit_sf"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td class="interdit"></td>
	<td>$-\infty$</td>
	<td></td>
	<td></td>
	<td class="interdit"></td>
</tr>
</table>


</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v22();">Variation 2x2</button>
</td>
<td>
<table class='var'>
<tr>
<td class='droite'>$x$</td>
	<td class='bas'>$-\infty$</td>
	<td class='bas'></td>
	<td class='bas'>$0$</td>
	<td class='bas'></td>
	<td class='bas'>$+\infty$</td>
</tr>
<tr>
	<td class='droite'>$f'(x)$</td>
	<td class='bas'></td>
	<td class='bas'>-</td>
	<td class='zero'></td>
	<td class='bas'>+</td>
	<td class='bas'></td>
</tr>
<tr>
	<td class='droite_seule'></td>
	<td>$+\infty$</td>
	<td></td>
	<td></td>
	<td></td>
	<td>$+\infty$</td>
</tr>
<tr>
	<td class='droite_seule'>$f(x)$</td>
	<td></td>
	<td class='decroissante'></td>
	<td></td>
	<td class='croissante'></td>
	<td></td>
</tr>
<tr>
	<td class='droite_seule'></td>
	<td>
	</td>
	<td></td>
	<td>8</td>
	<td></td>
	<td></td>
</tr>
</table>


</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v23();">Variation 2x3</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-\infty$</td>
	<td class="bas"></td>
	<td class="bas">$-1$</td>
	<td class="bas"></td>
	<td class="bas">$1$</td>
	<td class="bas"></td>
	<td class="bas">$+\infty$</td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="bas"></td>
	<td class="bas">-</td>
	<td class="zero"></td>
	<td class="bas">+</td>
	<td class="zero"></td>
	<td class="bas">-</td>
	<td class="bas"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td></td>
	<td class="decroissante"></td>
	<td class=""></td>
	<td class="croissante"></td>
	<td class=""></td>
	<td class="decroissante"></td>
	<td></td>
</tr>
<tr>
	<td class=""></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
</table>


</td>
</tr>
<tr>
<td style="text-align:right;">
<button class="boutonGris" onclick="v43();">Variation 4x3</button>
</td>
<td>
<table class="var">
<tr>
	<td class="droite">$x$</td>
	<td class="bas">$-\infty$</td>
	<td class="bas"></td>
	<td class="bas">$-1$</td>
	<td class="bas"></td>
	<td class="bas">$1$</td>
	<td class="bas"></td>
	<td class="bas">$+\infty$</td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="bas"></td>
	<td class="bas">+</td>
	<td class="verticale"></td>
	<td class="bas">+</td>
	<td class="zero"></td>
	<td class="bas">-</td>
	<td class="bas"></td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="bas"></td>
	<td class="bas">-</td>
	<td class="zero"></td>
	<td class="bas">+</td>
	<td class="verticale"></td>
	<td class="bas">+</td>
	<td class="bas"></td>
</tr>
<tr>
	<td class="droite">$f'(x)$</td>
	<td class="bas"></td>
	<td class="bas">-</td>
	<td class="zero"></td>
	<td class="bas">+</td>
	<td class="zero"></td>
	<td class="bas">-</td>
	<td class="bas"></td>
</tr>
<tr>
	<td class="droite_seule"></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
<tr>
	<td class="droite_seule">$f(x)$</td>
	<td></td>
	<td class="decroissante"></td>
	<td class=""></td>
	<td class="croissante"></td>
	<td class=""></td>
	<td class="decroissante"></td>
	<td></td>
</tr>
<tr>
	<td class=""></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
</table>


</td>
</tr>

</table>

<button class="boutonGris" onclick="annuleVar();" style="margin-bottom:50px;">Annuler</button>




</div>
<!-- TAB VAR ------------------------------------------------------>



<!-- Symbols LaTeX ------------------------------------------------------>
<div id="mathsPlus">
	<table style="border-collapse:collapse;border:solid 1px black;margin:auto;">
		<tr>
		
			<td class="cadre" onclick="insertText('\\in','','textareaCode')">&isin; \in</td>	
			<td class="cadre" onclick="insertText('\\notin','','textareaCode')">&notin; \notin</td>
			<td class="cadre" onclick="insertText('\\cap','','textareaCode')">&cap; \cap</td>
			<td class="cadre" onclick="insertText('\\cup','','textareaCode')">&cup; \cup</td>
			<td class="cadre" onclick="insertText('\\oslash','','textareaCode')">&empty; \oslash</td>
			<td class="cadre" onclick="insertText('\\subset','','textareaCode')">&sub; \subset</td>
			<td class="cadre" onclick="insertText('\\supset','','textareaCode')">&sup; \supset</td>
			<td class="cadre" onclick="insertText('\\overline{','}','textareaCode')"><span style="border-top:1px solid black;">A</span> \overline{}</td>
		</tr>
		
		
		<tr>
			<td class="cadre" onclick="insertText('\\pm','','textareaCode')">&#8723; \pm</td>
			<td class="cadre" onclick="insertText('\\div','','textareaCode')">&divide; \div</td>
			<td class="cadre" onclick="insertText('\\times','','textareaCode')">&times; \times</td>
			<td class="cadre" onclick="insertText('\\neq','','textareaCode')">&ne; \neq</td>
			<td class="cadre" onclick="insertText('\\approx','','textareaCode')">&asymp; \approx</td>
			<td class="cadre" onclick="insertText('\\simeq','','textareaCode')">&#8771; \simeq</td>
			<td class="cadre" onclick="insertText('\\sim','','textareaCode')">&sim; \sim</td>
			<td class="cadre" onclick="insertText('\\equiv','','textareaCode')">&equiv; \equiv</td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\exists','','textareaCode')">&exist; \exists</td>
			<td class="cadre" onclick="insertText('\\forall','','textareaCode')">&forall; \forall</td>
			<td class="cadre" onclick="insertText('\\leq','','textareaCode')">&le; \leq</td>
			<td class="cadre" onclick="insertText('\\geq','','textareaCode')">&ge; \geq</td>
			<td class="cadre" onclick="insertText('\\infty','','textareaCode')">&infin; \infty</td>
			<td class="cadre" onclick="insertText('\\bullet','','textareaCode')">&bullet; \bullet</td>
			<td class="cadre" onclick="insertText('\\star','','textareaCode')">&star; \star</td>
			<td class="cadre" onclick="insertText('\\setminus','','textareaCode')">\ \setminus</td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\widehat{','}','textareaCode')">&Acirc; \widehat{}</td>
			<td class="cadre" onclick="insertText('\\vec{','}','textareaCode')">&#8407; \vec{}</td>
			<td class="cadre" onclick="insertText('\\dot{','}','textareaCode')">&#550; \dot{}</td>
			
			<td class="cadre" onclick="insertText('\\neg','','textareaCode')">&rceil; \neg</td>
			<td class="cadre" onclick="insertText('\\ldots','','textareaCode')">... \ldots</td>
			<td class="cadre" onclick="insertText('\\cdots','','textareaCode')">&#8943; \cdots</td>
			<td class="cadre" onclick="insertText('\\vdots','','textareaCode')">&#8942; \vdots</td>
			<td class="cadre" onclick="insertText('\\ddots','','textareaCode')">&#8945; \ddots</td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\partial','','textareaCode')">&part; \partial</td>
			<td class="cadre" onclick="insertText('\\prime','','textareaCode')">&rsquo; \prime</td>
			<td class="cadre" onclick="insertText('\\leftarrow','','textareaCode')">&#8594;  \leftarrow</td>
			<td class="cadre" onclick="insertText('\\rightarrow','','textareaCode')">&#8592;  \rightarrow</td>
			<td class="cadre" onclick="insertText('\\Leftarrow','','textareaCode')">&#8658; \Leftarrow</td>
			<td class="cadre" onclick="insertText('\\Rightarrow','','textareaCode')">&#8656;  \Rightarrow</td>
			<td class="cadre" onclick="insertText('\\Longleftrightarrow','','textareaCode')">&hArr; <span style="font-size:x-small;">\Longleftrightarrow</span></td>
			<td class="cadre" onclick="insertText('\\mapsto','','textareaCode')">&#8614;  \mapsto</td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\alpha','','textareaCode')">&alpha; \alpha</td>
			<td class="cadre" onclick="insertText('\\beta','','textareaCode')">&beta; \beta</td>
			<td class="cadre" onclick="insertText('\\gamma','','textareaCode')">&gamma; \gamma</td>
			<td class="cadre" onclick="insertText('\\delta','','textareaCode')">&delta; \delta</td>
			<td class="cadre" onclick="insertText('\\epsilon','','textareaCode')">&epsilon; \epsilon</td>
			<td class="cadre" onclick="insertText('\\zeta','','textareaCode')">&zeta; \zeta</td>
			<td class="cadre" onclick="insertText('\\eta','','textareaCode')">&eta; \eta</td>
			<td class="cadre" onclick="insertText('\\theta','','textareaCode')">&theta; \theta</td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\lambda','','textareaCode')">&lambda; \lambda</td>
			<td class="cadre" onclick="insertText('\\mu','','textareaCode')">&mu; \mu</td>
			<td class="cadre" onclick="insertText('\\nu','','textareaCode')">&nu; \nu</td>
			<td class="cadre" onclick="insertText('\\xi','','textareaCode')">&xi; \xi</td>
			<td class="cadre" onclick="insertText('\\pi','','textareaCode')">&pi; \pi</td>
			<td class="cadre" onclick="insertText('\\rho','','textareaCode')">&rho; \rho</td>
			<td class="cadre" onclick="insertText('\\sigma','','textareaCode')">&sigma; \sigma</td>
			<td class="cadre" onclick="insertText('\\tau','','textareaCode')">&tau; \tau</td>
		</tr>
		<tr>
			<td class="cadre" onclick="insertText('\\varphi','','textareaCode')">&phi; \varphi</td>
			<td class="cadre" onclick="insertText('\\chi','','textareaCode')">&chi; \chi</td>
			<td class="cadre" onclick="insertText('\\psi','','textareaCode')">&psi; \psi</td>
			<td class="cadre" onclick="insertText('\\omega','','textareaCode')">&omega; \omega</td>
			<td class="cadre" onclick="insertText('\\Gamma','','textareaCode')">&Gamma; \Gamma</td>
			<td class="cadre" onclick="insertText('\\Delta','','textareaCode')">&Delta; \Delta</td>
			<td class="cadre" onclick="insertText('\\theta','','textareaCode')">&theta; \theta</td>
			<td class="cadre" onclick="insertText('\\nabla','','textareaCode')">&nabla; \nabla</td>
		</tr>
		<tr>
			
			<td class="cadre" onclick="insertText('\\Phi','','textareaCode')">&Phi; \Phi</td>
			<td class="cadre" onclick="insertText('\\Psi','','textareaCode')">&Psi; \Psi</td>
			<td class="cadre" onclick="insertText('\\Pi','','textareaCode')">&Pi; \Pi</td>
			<td class="cadre" onclick="insertText('\\Sigma','','textareaCode')">&Sigma; \Sigma</td>
			<td class="cadre" onclick="insertText('\\aleph','','textareaCode')">&aleph; \aleph</td>
			<td class="cadre" onclick="insertText('[\\![ \\, ]\\!]','','textareaCode')">$[\![ \, ]\!]$</td>
			<td class="cadre" onclick="insertText('\','','textareaCode')"></td>
			<td class="cadre" onclick="insertText('\','','textareaCode')"></td>
		</tr>
		
		<tr>
			<td class="cadre" onclick="insertText('\\mathcal{','}','textareaCode')">\mathcal{}</td>
			<td class="cadre" onclick="insertText('\\mathscr{','}','textareaCode')">\mathscr{}</td>
			<td class="cadre" onclick="insertText('\\mathbb{R}','','textareaCode')">&#x211d; \mathbb{R}</td>
			<td class="cadre" onclick="insertText('\\mathbb{Q}','','textareaCode')">&#x211a; \mathbb{Q}</td>
			<td class="cadre" onclick="insertText('\\mathbb{Z}','','textareaCode')">&#8484; \mathbb{Z}</td>
			<td class="cadre" onclick="insertText('\\mathbb{N}','','textareaCode')">&#x2115; \mathbb{N}</td>
			<td class="cadre" onclick="insertText('\\wedge','','textareaCode')">&and; \wedge</td>
			<td class="cadre" onclick="insertText('\\vee','','textareaCode')">&or; \vee</td>
			
		</tr>
	</table>
	
	<br />
	<button onclick="plusMaths()" class="boutonBlanc">Fermer</button>
	
</div>
<!-- Fin Symbols LaTeX ---------------------------------------------------->


<!-- Début Graphe de fonctions -->

<div id="graphePlus">

<button onclick="graphe()" class="boutonBlanc">Grapheur</button>

<button onclick="simpleGraphe()" class="boutonBlanc">Graphique simple</button>



<br /><br /><br />


	<button onclick="afficheGraphe()" class="boutonBlanc">Fermer</button>
</div>
<!-- Fin Graphe de fonctions -->





<!-- Zone SVG ----------------------------------------------------------- -->

<div id="svg">
<table style="text-align:center;margin:auto;">
<!--
<tr>
<td>
<a href="svg-edit-2.4/svg-editor.html" target="_blank">
<button title="SVG Edit" class="boutonB" type="button" style="color:#ffffff;" onclick="zoneSVG();">Editeur SVG</button>
</a>
</td>
</tr>
-->
<tr>
<td>
<a href="content/svg-figures.html" target="_blank">
<button title="Figures SVG" class="boutonB" type="button" style="color:#ffffff;" onclick="zoneSVG();">Code SVG de figures mathématiques</button>
</a>
</td>
</tr>

<tr>
<td>
<button title="Mathjax dans svg" class="boutonB" type="button" style="color:#ffffff" onclick="insertText('<foreignObject x=\'\' y=\'\' width=\'\' height=\'\'>','</foreignObject>','textareaCode')">Formules de mathématiques dans SVG</button>
</td>
</tr>

<tr>
<td style="padding-top:40px;">
<button onclick="zoneSVG();">Fermer</button>
</td>
</tr>

</table>
</div>

<!-- Fin Zone SVG ------------------------------------------------------- -->











<!------- Peinture -------------------->




<div id="paint">

<div id="fermePaint" onclick="zonePaint()">&#10005;</div>

<p>

<canvas id="canvas"  width="700" height="400" style="margin-top: 20px;border: solid 0px black;"></canvas>
		
<div style="display: flex;justify-content: space-around;margin-top: -5px;">
<ul id="couleurs">
		<li><a style="background: none repeat scroll 0% 0% rgb(0, 0, 0);" href="#" data-couleur="#000000">Noir</a></li>
		<li><a style="background: none repeat scroll 0% 0% rgb(255, 255, 255);" href="#" data-couleur="#ffffff">Blanc</a></li>
		<li><a id="coulRouge" style="background: none repeat scroll 0% 0% rgb(255, 0, 0);" href="#" data-couleur="#ff0000">Rouge</a></li>
		<li><a style="background: none repeat scroll 0% 0% orange;" href="#" data-couleur="orange">Orange</a></li>
		<li><a style="background: none repeat scroll 0% 0% green;" href="#" data-couleur="green">Vert</a></li>
		<li><a style="background: none repeat scroll 0% 0% blue;" href="#" data-couleur="blue">Bleu</a></li>
</ul>

<table style="margin-top: -20px;">
	<tr>
	<td id="pinceau1" style="cursor: pointer;font-size: 150%;text-shadow: 3px 3px 3px #a0a0a0;">&#9679;</td>
	<td id="pinceau2" style="cursor: pointer;font-size: 200%;">&#9679;</td>
	<td id="pinceau3" style="cursor: pointer;font-size: 250%;">&#9679;</td>
	</tr>
</table>

<div style="width: 250px;">



<button id="crayon">&#9998;</button>

<button id="trait">|</button>

<button id="cercle">&#9711;</button>

<button id="dashed">--</button>

<button id="gomme">&#8998;</button>

<button id="undo">&cularr;</button>

<button id="redo">&curarr;</button>

</div>

<button id="canvasData" onclick="canvasPush()">Coller</button>

<form id="largeurs_pinceau" style="display:inline;">
	<input id="reset" value="Réinitialiser" type="reset">
</form>


</div>

</p>
</div>




<script>
$( function() {
    $( "#paint" ).draggable({cancel: 'p'}).resizable();
    $( "#latexR" ).draggable({cancel: 'p'}).resizable();

    
	 //$('#latexR').css('display','none');
    $('#latexR').css('position','absolute');
    $('#latexR').css('top','100px');
    $('#latexR').css('left','10px');
    $('#latexR').css('width','200px');
    $('#latexR').css('height','220px');
    $('#latexR').css('background','rgba(100,100,100,0.5');
    $('#latexR').css('text-align','center');
    $('#latexR').css({BorderTopRightRadius: '10px', BorderTopLeftRadius: '10px'});
    $('#latexR').css('border-top','solid 15px black');
    $('#latexR').css('box-shadow','5px 5px 5px #a0a0a0');
    
    $('#mathpix').css('height','170px');
    $('#mathpix').css('width','190px');
    $('#mathpix').css('margin','5px');
    $('#mathpix').css('background','white');
    $('#mathpix').css('overflow','auto');
    
    $('#mathpix').change( function () {
    		$('#mathpix').css('overflow','auto');
    }
    
    );
    
    $('#imgC').css('display','none');
    $('#imgC').css('position','fixed');
    $('#imgC').css('top','300px');
    $('#imgC').css('left','10px');
    $('#imgC').css('width','100px');
    $('#imgC').css('height','100px');
    $('#imgC').css('background','rgba(200,100,100,0.5');
    $('#imgC').css('z-index','100')
  } );
   
$(function(){
	
	$('#ialatex').click(function (){
	
	
	
	$("#mathpix").css('background-image','url("wait2.gif")');
	$("#mathpix").css('background-position','center');
	$("#mathpix").css('background-repeat','no-repeat'); 
	$("#mathpix").css('background-size','135px 100px');
	
	
	
	$('#imgC').load(' ',{imgData: document.getElementById("canvas").toDataURL()},
			function (reponseText,textStatus,XMLHttpRequest) {
					if ( textStatus == "success" ) {
						console.log("ok 1");
					}
					else {
						console.log("Erreur image")
					}
				});
		
	
	setTimeout( function (){$('#mathpix').load('',
			function (reponseText,textStatus,XMLHttpRequest) {
					if ( textStatus == "success" ) {
						console.log("ok 2");
						$("#mathpix").css('background-image','url("")');
					}
				}); },200);
				
	
	

	});
	
	$('#addLatex').click(function (){
		var ajout = document.getElementById("mathpix").innerHTML;
		ajout = ajout.replace(/<br>/g, "");
		insertText(ajout,'','textareaCode');
		submitTryit();
	});
	
	
});


</script>






<!----------- Fin Peinture -------------->















<!------- ZoneJSX -------------------->




<div id="zoneJSX">

<div id="fermeJSX" onclick="zoneJSX()">&#10005;</div>

<div id="messageJSX"> </div>

<p>






		
<div style="display: flex;justify-content: space-around;margin-top: 5px;">
<ul id="couleursJSX">
		<li><a style="background: none repeat scroll 0% 0% rgb(0, 0, 0);" href="#" data-couleur="#000000">Noir</a></li>
		<li><a style="background: none repeat scroll 0% 0% rgb(255, 255, 255);" href="#" data-couleur="#ffffff">Blanc</a></li>
		<li><a id="coulRougeJSX" style="background: none repeat scroll 0% 0% rgb(255, 0, 0);" href="#" data-couleur="#ff0000">Rouge</a></li>
		<li><a style="background: none repeat scroll 0% 0% orange;" href="#" data-couleur="orange">Orange</a></li>
		<li><a style="background: none repeat scroll 0% 0% green;" href="#" data-couleur="green">Vert</a></li>
		<li><a style="background: none repeat scroll 0% 0% blue;" href="#" data-couleur="blue">Bleu</a></li>
		<li><a style="background: none repeat scroll 0% 0% purple;" href="#" data-couleur="purple">Violet</a></li>
		<li><a style="border: solid 1px rgba(0,0,0,0.2);background: none repeat scroll 0% 0% pink;" href="#" data-couleur="pink">Rose</a></li>
		<li><a style="border: solid 1px rgba(0,0,0,0.2);background: none repeat scroll 0% 0% yellow;" href="#" data-couleur="yellow">Jaune</a></li>
		<li><a style="border: solid 1px rgba(0,0,0,0.2);background: none repeat scroll rgb(100,255,100);" href="#" data-couleur="rgb(100,255,100)">Vert clair</a></li>
		<li><a style="border: solid 1px rgba(0,0,0,0.2);background: none repeat scroll rgb(150,150,255);" href="#" data-couleur="rgb(150,150,255)">Violet clair</a></li>
		<li><a style="border: solid 1px rgba(0,0,0,0.2);background: none repeat scroll rgb(50,250,255);" href="#" data-couleur="rgb(50,250,255)">Bleu clair</a></li>
</ul>

<table style="margin-top: -20px;">
	<tr>
	<td id="pinceau1JSX" style="cursor: pointer;font-size: 150%;text-shadow: 3px 3px 3px #505050;">&#9679;</td>
	<td id="pinceau2JSX" style="cursor: pointer;font-size: 200%;">&#9679;</td>
	<td id="pinceau3JSX" style="cursor: pointer;font-size: 250%;">&#9679;</td>
	</tr>
</table>

<div  id="outilsJSX" style="width: 400px;">

<button id="fingerJSX">&#9755;<span>Déplacer</span></button>


<button id="crayonJSX">&#9998;<span>Points</span></button>

<button id="droiteJSX">/<span>Droite</span></button>

<button id="traitJSX">|<span>Segment</span></button>

<button id="vecteurJSX">&nearr;<span>Vecteur</span></button>

<button id="cercleJSX">&#9711;<span>Cercle</span></button>

<button id="arcJSX" class="btnObjJSX">&#9696;<span>Arc de cercle :<br />Centre, point de départ, point donnant direction et longueur.</span></button>

<button id="ellipseJSX"class="btnObjJSX">0<span>Ellipse :<br />foyer, foyer, point sur ellipse.</span></button>

<button id="polyJSX">&#11041;<span>Polygone</span></button>

<button id="gommeJSX">&#8998;<span>Effacer</span></button>

<button id="invisibleJSX" class="btnObjJSX">&#128083;<span>Rendre invisible.<br />Changer l'épaisseur pour rendre à nouveau visible.</span></button>

<button id="interJSX" class="btnObjJSX">&#9747;<span>Intersection :<br />cliquer sur deux objets.</span></button>

<button id="milieuJSX" class="btnObjJSX">&#8760;<span>Milieu :<br />cliquer sur un segment.</span></button>



<button id="perpJSX" class="btnObjJSX">&#8515;<span>Droite perpendiculaire :<br />cliquer sur un point, <br />puis sur une droite.</span></button>

<button id="paraJSX" class="btnObjJSX">//<span>Droite parallèle :<br />cliquer sur un point, <br />puis sur une droite.</span></button>

<button id="integraleJSX" class="btnObjJSX">&#8747;<span>Aire sous une courbe :<br />cliquer sur deux points <br />d'une courbe.</span></button>

<button id="tangenteJSX" class="btnObjJSX">&#8770;<span>Tangente à une courbe :<br />cliquer sur un point <br />d'une courbe.</span></button>

<button id="changeCoulJSX">✍<span>Changer couleur,<br />épaisseur, <br />style etc.</span></button>

<button id="dashedJSX">--<span>Pointillés</span></button>

<button id="alphaJSX">&#9677;<span>Remplissage</span></button>

<button id="aimantJSX">&#129522;<span>Point collé<br />sur la grille</span></button>

<button id="grilleJSX">&#9638;<span>Grille</span></button>

<button id="axeJSX">&boxvh;<span>Axes</span></button>



</div>

<button id="zoneJSXData">Coller</button>




</div>

<div style="display: flex;justify-content: space-around;margin-top: -5px;" class="noDrag">

<table style="background-color: rgb(200,200,200);padding: 5px;">
<tr>
<td>
Xmin : <input type="text" id="xminJSX" name="xminJSX" minlength="1" maxlength="8" size="4" value="-5" readonly="false" style="width: 40px;">
</td>
<td>
Xmax : <input type="text" id="xmaxJSX" name="xmaxJSX" minlength="1" maxlength="8" size="4" value="5" readonly="false" style="width: 40px;">
</td>
</tr>

<tr>
<td>
Ymin : <input type="text" id="yminJSX" name="yminJSX" minlength="1" maxlength="8" size="4" value="-5" readonly="false" style="width: 40px;">
</td>
<td>
Ymax : <input type="text" id="ymaxJSX" name="ymaxJSX" minlength="1" maxlength="8" size="4" value="5" readonly="false" style="width: 40px;">
</td>
</tr>


<tr>
<td colspan="2"><button id="valideGrille" class="buttonJSX">Changer la fenêtre</button></td>
</tr>
</table>










<div style="text-align: right;" class="noDrag">
Fonction : <input type="text" id="exprAlg" name="exprAlg" minlength="1" maxlength="30" size="4" value="x*x" readonly="false" style="width: 80px;"> <button id="valideFunc" class="buttonJSX">&crarr;</button>

<br />

Texte : <input type="text" id="exprTexte" name="exprTexte" minlength="1" maxlength="30" size="4" value="" readonly="false" style="width: 100px;"> <button id="valideTexte" class="buttonJSX">&crarr;<span>Cliquer ici, <br />puis dans la fenêtre</span></button>


<br />

<button id="insererCodeJSX" class="buttonJSX">Charger code</button>

</div>


<div style="text-align: right;" class="noDrag">
<button id="undoJSX" class="btnObjJSX">&cularr;</button>

<button id="redoJSX" class="btnObjJSX">&curarr;</button>
</div>




<div>

<button id="valideDim" class="buttonJSX">Dimensions</button>



<button id="resetJSX" class="buttonJSX">Réinitialiser</button>



</div>


</div>



<div id="graphJSX">
</div>



</p>
</div>



<div id="loadCodeJSX">

<div style="width:600px;box-shadow:3px 3px 5px rgba(0,0,0,0.8); margin: auto;padding: 30px;margin-top: 100px;text-align: left;background-color: rgba(255,255,255,1);">
Copier du code JSX Graph dans la fenêtre ci-dessous.

<br />

Attention ceci effacera le graphique actuel.

<br />

Seul le code de création d'élément est possible : ne pas inclure la balise <pre> &lt;script&gt; </pre> ainsi que le code d'initialisation de JXG. Le bounding box sera sans doute à modifier.

<textarea id="zoneCopieJSX" style="display: block; width: 350px;height: 350px;margin: auto;resize: none;padding: 5px;border: solid 1px rgb(200,200,200);">

</textarea>

<div style="text-align: center;">
<button id="valideCodeJSX">Oui</button> <button id="annuleCodeJSX">Annuler</button>
</div>

</div>

</div>






<div id="changeFenJSX">

<div id="fermeChangeFenJSX">&#10005;</div>

<table style="padding: 5px;display: block;" class="noDrag">
<tr>

</tr>

<tr>
<td>
Largeur
</td>
<td> 
<input type="range" min="50" max="700" value="350" class="slider" id="largeurFenJSX">
</td>
<td>
<span id="valLargeurJSX">350px</span>
</td>

</tr>

<tr>
<td>
Hauteur
</td>
<td> 
<input type="range" min="50" max="500" value="350" class="slider" id="hauteurFenJSX">
</td>
<td>
<span id="valHauteurJSX">350px</span>
</td>

</tr>
</table>
</div>








<script>
$( function() {
    $( "#zoneJSX" ).draggable({cancel: '.noDrag'}).resizable();
    
    $( "#changeFenJSX" ).draggable({cancel: '.noDrag'}).resizable();
    });



</script>






<!----------- ZoneJSX -------------->






























<div id="mess_sauve">

</div>

<style>
#mess_sauve{
	display: none;
	position: fixed;
	top: 100px;
	right: 40px;
	left: 40px;
	height: 50px;
	line-height: 50px;
	border-radius: 10px;
	background-color: rgba(148,254,136,0.6);
	text-align: center;
}
</style>


<script>
setTimeout( function () {
	submitTryit()
},2000 );
</script>



    
        
</body>
</html>
