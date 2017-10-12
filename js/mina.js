$(document).ready(function() {
	var tabu = "";
	var valores = [];
	var openCont = 0;
	var oriOpenCont = 0;
	var gerarbomb = !false;
	var contpe = !false;
	var firstger;
	var sendefediteste = false;

	$("#gerar").click(function() {
		openCont = 0;
		var dific;
		if ($("select").val() == 666) {
			dific = $("#chato").val() / 100;
		} else {
			dific = $("select").val() / 100;
		}
		console.log("Porcentagem de bombas = "+dific);

		var tamtab;
		firstger = true;
		tamtab = $("#tabb").val();
		console.log("tamanho do tabuleiro = " + tamtab);

		for (var i = 0; i < tamtab; i++) {
			valores[i] = [];
			for (var j = 0; j < tamtab; j++) {
				valores[i][j] = 0;
			}
		}
		console.log(valores);

		$("#gerar").toggle(this);
		$(".tabb").toggle(this);
		$("#aff").hide("slow");
		$("#fedi").hide("slow");

		for (var i = 0; i < valores.length; i++) {
			for (var j = 0; j < valores[i].length; j++) {
				if (valores[i][j] == 0) {
					tabu += "<span class='tabuleiro green accent-3 hoverable fechada' data-l = '" + i + "' data-c = '" + j + "'>_</span>";
				} else {
					tabu += "<span class='tabuleiro green accent-3 hoverable fechada' data-l = '" + i + "' data-c = '" + j + "'>" + valores[i][j] + "</span>";
				}
			}
			tabu += "<br>";
		}

		$("#tabmos").html(tabu);

		$("span").click(function() {
			if (firstger) {
				firstger = false;
				var l = $(this).attr("data-l");
				var c = $(this).attr("data-c");
				var bomb = (tamtab * tamtab) * dific;
				console.log("numero de bombas = " + bomb);
				for (var i = 0; i < bomb && gerarbomb; i++) {
					var bol = true;
					while (bol) {
						var x = Math.floor((Math.random() * (tamtab)) + 0);
						var y = Math.floor((Math.random() * (tamtab)) + 0);
						if (valores[x][y] == "x" && x == l && y == c) {
						} else if (x == l && y == c) {
							console.log("BombFirstPut")
						} else {
							valores[x][y] = "x";
							bol = false;
						}
					}
				}

				for (var i = 0; i < valores.length && contpe; i++) {
					for (var j = 0; j < valores[i].length; j++) {
						if (valores[i][j] != "x") {
							for (var k = 0; k < 8; k++) {
								var x = i;
								var y = j;
								if (k == 0) {
									x--;
									y--;
								} else if (k == 1) {
									x--;
								} else if (k == 2) {
									x--;
									y++;
								} else if (k == 3) {
									y--;
								} else if (k == 4) {
									y++;
								} else if (k == 5) {
									x++;
									y--;
								} else if (k == 6) {
									x++;
								} else if (k == 7) {
									x++;
									y++;
								}
								if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
									if (valores[x][y] == "x") {
										valores[i][j]++;
									}
								}
							}
						}
					}
				}

				for (var i = 0; i < valores.length; i++) {
					for (var j = 0; j < valores[i].length; j++) {
						if (valores[i][j] != "x" && valores[i][j] != 0) {
							openCont++;
						}
					}
				}
				oriOpenCont = openCont;
				console.log("Casas para serem abertas = " + openCont);

				tabu = "";
				for (var i = 0; i < valores.length; i++) {
					for (var j = 0; j < valores[i].length; j++) {
						if (valores[i][j] == 0) {
							tabu += "<span class='tabuleiro green accent-3 hoverable fechada' data-l = '" + i + "' data-c = '" + j + "'>_</span>"
						} else {
							tabu += "<span class='tabuleiro green accent-3 hoverable fechada' data-l = '" + i + "' data-c = '" + j + "'>" + valores[i][j] + "</span>";
						}
					}
					tabu += "<br>";	
				}

				$("#tabmos").html(tabu);
				var i = $(this).attr("data-l");
				var j = $(this).attr("data-c");
				console.log("Linha = " + i + "  Coluna = " + j);
				$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("fechada");
				$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("open");

				if (valores[i][j] == "x") {
					window.alert("Voce perdeu");
					$("#tabmos").html("");
					$("#gerar").toggle(this);
					$(".tabb").toggle(this);
				} else if (valores[i][j] == 0) {
					emptyTeste(i, j);
					affmano();
					testOpenCont( );
				} else if (valores[i][j] == 1) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("lime darken-1");
					testOpenCont( );
				} else if (valores[i][j] == 2) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("orange darken-3");
					testOpenCont( );
				} else if (valores[i][j] == 3) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("red");
					testOpenCont( );
				} else if (valores[i][j] == 4) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("yellow accent-3");
					testOpenCont( );
				} else if (valores[i][j] == 5) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass(" light-green accent-4");
					testOpenCont( );
				} else if (valores[i][j] == 6) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("purple darken-3");
					testOpenCont( );
				} else if (valores[i][j] == 7) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("brown darken-1");
					testOpenCont( );
				} else if (valores[i][j] == 8) {
					$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
					$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("grey lighten-2");
					testOpenCont( );
				}
			}


			$("span").contextmenu(function() {
  				if (!$(this).hasClass("marq") && !$(this).hasClass("open")) {
  					$(this).addClass("deep-orange accent-4 marq");
  					$(this).removeClass("fechada");
  				}
  				else {
  					if ($(this).hasClass("open")) {}
  					else {
  						$(this).removeClass("deep-orange accent-4 marq");
  						$(this).addClass("fechada");
  					}
  				}
			});





			$("span").click(function() {
				var i = $(this).attr("data-l");
				var j = $(this).attr("data-c");
				console.log("Linha = " + i + "  Coluna = " + j);
				$(this).removeClass("fechada");
				if (!$("span[data-l='" + i + "'][data-c='" + j + "']").hasClass("marq")) {
					$(this).addClass("open");	
				}
				

				if (!$(this).hasClass("marq")) {
					if (valores[i][j] == "x") {
						window.alert("Voce perdeu");
						$("#contbu").show(this);
						$("span").removeClass("fechada");
						for (var ii = 0; ii < valores.length; ii++) {
							for (var jj = 0; jj < valores[ii].length; jj++) {
								if (valores[ii][jj] == 1) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("lime darken-1");
								} else if (valores[ii][jj] == 2) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("orange darken-3");
								} else if (valores[ii][jj] == 3) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("red");
								} else if (valores[ii][jj] == 4) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("yellow accent-3");
								} else if (valores[ii][jj] == 5) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass(" light-green accent-4");
								} else if (valores[ii][jj] == 6) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("purple darken-3");
								} else if (valores[ii][jj] == 7) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("brown darken-1");
								} else if (valores[ii][jj] == 8) {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("grey lighten-2");
								} else if (valores[ii][jj] == "x") {
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").removeClass("green accent-3");
									$("span[data-l='" + ii + "'][data-c='" + jj + "']").addClass("blue-grey darken-4");
								}
							}
						}

					} else if (valores[i][j] == 0) {
						emptyTeste(i, j);
						affmano( );
						testOpenCont( );
					} else if (valores[i][j] == 1) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("lime darken-1");
						testOpenCont( );
					} else if (valores[i][j] == 2) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("orange darken-3");
						testOpenCont( );
					} else if (valores[i][j] == 3) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("red");
						testOpenCont( );
					} else if (valores[i][j] == 4) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("yellow accent-3");
						testOpenCont( );
					} else if (valores[i][j] == 5) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass(" light-green accent-4");
						testOpenCont( );
					} else if (valores[i][j] == 6) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("purple darken-3");
						testOpenCont( );
					} else if (valores[i][j] == 7) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("brown darken-1");
						testOpenCont( );
					} else if (valores[i][j] == 8) {
						$("span[data-l='" + i + "'][data-c='" + j + "']").removeClass("green accent-3");
						$("span[data-l='" + i + "'][data-c='" + j + "']").addClass("grey lighten-2");
						testOpenCont( );
					}

					if (openCont == 0) {
						window.alert("Voce ganhou");
						$("#tabmos").html("");
						$("#gerar").toggle(this);
						$(".tabb").toggle(this);
						$("#aff").show("slow");
						tabu = "";
						valores = [];
						openCont = 0;
						tempoDiJogo = 0;
					}
				}

			});
		});

	});








	function emptyTeste(i, j) {
		for (var k = 0; k < 8; k++) {
			var x = i;
			var y = j;
			if (k == 0) {
				x--;
				y--;
			} else if (k == 1) {
				x--;
			} else if (k == 2) {
				x--;
				y++;
			} else if (k == 3) {
				y--;
			} else if (k == 4) {
				y++;
			} else if (k == 5) {
				x++;
				y--;
			} else if (k == 6) {
				x++;
			} else if (k == 7) {
				x++;
				y++;
			}
			if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
				if (valores[x][y] == "0") {
					console.log("emptyTeste1 "+x + " " + y);
					emptyTeste2(x, y);
					$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("fechada");
				}
			}
		}
	}

	function emptyTeste2(i, j) {
		for (var k = 0; k < 8; k++) {
			var x = i;
			var y = j;
			if (k == 0) {
				x--;
				y--;
			} else if (k == 1) {
				x--;
			} else if (k == 2) {
				x--;
				y++;
			} else if (k == 3) {
				y--;
			} else if (k == 4) {
				y++;
			} else if (k == 5) {
				x++;
				y--;
			} else if (k == 6) {
				x++;
			} else if (k == 7) {
				x++;
				y++;
			}
			if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
				if (valores[x][y] == "0") {
					console.log("emptyTeste2 "+x + " " + y);
					$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("fechada");
					emptyTeste3(x, y)
				}
			}
		}
	}

	function emptyTeste3(i, j) {
		for (var k = 0; k < 8; k++) {
			var x = i;
			var y = j;
			if (k == 0) {
				x--;
				y--;
			} else if (k == 1) {
				x--;
			} else if (k == 2) {
				x--;
				y++;
			} else if (k == 3) {
				y--;
			} else if (k == 4) {
				y++;
			} else if (k == 5) {
				x++;
				y--;
			} else if (k == 6) {
				x++;
			} else if (k == 7) {
				x++;
				y++;
			}
			if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
				if (valores[x][y] == "0") {
					console.log("emptyTeste3 "+x + " " + y);
					$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("fechada");
					emptyTeste4(x, y);
				}
			}
		}
	}

	function emptyTeste4(i, j) {
		for (var k = 0; k < 8; k++) {
			var x = i;
			var y = j;
			if (k == 0) {
				x--;
				y--;
			} else if (k == 1) {
				x--;
			} else if (k == 2) {
				x--;
				y++;
			} else if (k == 3) {
				y--;
			} else if (k == 4) {
				y++;
			} else if (k == 5) {
				x++;
				y--;
			} else if (k == 6) {
				x++;
			} else if (k == 7) {
				x++;
				y++;
			}
			if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
				if (valores[x][y] == "0") {
					console.log("emptyTeste4 "+x + " " + y);
					$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("fechada");
					emptyTeste5(x, y);
				}
			}
		}
	}

	function emptyTeste5(i, j) {
		for (var k = 0; k < 8; k++) {
			var x = i;
			var y = j;
			if (k == 0) {
				x--;
				y--;
			} else if (k == 1) {
				x--;
			} else if (k == 2) {
				x--;
				y++;
			} else if (k == 3) {
				y--;
			} else if (k == 4) {
				y++;
			} else if (k == 5) {
				x++;
				y--;
			} else if (k == 6) {
				x++;
			} else if (k == 7) {
				x++;
				y++;
			}
			if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
				if (valores[x][y] == "0") {
					console.log("emptyTeste5 "+x + " " + y);
					$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("fechada");
				}
			}
		}
	}

	function affmano( ) {
		for (var i = 0; i<valores.length; i++) {
			for (var j = 0; j<valores[i].length; j++) {
				if (!$("span[data-l='"+i+"'][data-c='"+j+"']").hasClass("fechada") && valores[i][j]==0) {
					console.log("EmptyHouse");
					for (var k = 0; k < 8; k++) {
						var x = i;
						var y = j;
						if (k == 0) {
							x--;
							y--;
						} else if (k == 1) {
							x--;
						} else if (k == 2) {
							x--;
							y++;
						} else if (k == 3) {
							y--;
						} else if (k == 4) {
							y++;
						} else if (k == 5) {
							x++;
							y--;
						} else if (k == 6) {
							x++;
						} else if (k == 7) {
							x++;
							y++;
						}
						if ((x >= 0 && x < valores.length) && (y >= 0 && y < valores[i].length)) {
							$("span[data-l='"+x+"'][data-c='"+y+"']").removeClass("fechada marq deep-orange accent-4");
							if (valores[x][y] == 1) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("lime darken-1 open");
							} else if (valores[x][y] == 2) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("orange darken-3 open");
							} else if (valores[x][y] == 3) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("red open");
							} else if (valores[x][y] == 4) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("yellow accent-3 open");
							} else if (valores[x][y] == 5) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass(" light-green accent-4 open");
							} else if (valores[x][y] == 6) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("purple darken-3 open");
							} else if (valores[x][y] == 7) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("brown darken-1 open");
							} else if (valores[x][y] == 8) {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("grey lighten-2 open");
							} else if (valores[x][y] == "x") {
								$("span[data-l='" + x + "'][data-c='" + y + "']").removeClass("green accent-3");
								$("span[data-l='" + x + "'][data-c='" + y + "']").addClass("blue-grey darken-4 open");
							}
						}
					}
				}
			}
		}
	}

	function testOpenCont( ) {
		var openEmptyTesteCloseToTesteAndNotBug = 0;
		for (var iii = 0; iii<valores.length; iii++) {
			for (var jjj = 0; jjj<valores.length; jjj++) {
				if ((!$("span[data-l='"+iii+"'][data-c='"+jjj+"']").hasClass("fechada") && !$("span[data-l='"+iii+"'][data-c='"+jjj+"']").hasClass("marq")) && valores[iii][jjj]!="x" && valores[iii][jjj]!=0) {
					openEmptyTesteCloseToTesteAndNotBug++;
				}
			}
		}
		openCont = oriOpenCont - openEmptyTesteCloseToTesteAndNotBug;
		console.log("Casas a serem abertas = "+openCont);
	}



	$('select').material_select();
	$("#contbu").hide(this);
	$(".menu-chato").hide(this);
	$("#aff").hide(this);
	$("#fedi").hide(this);
	$("#sendfedi").hide(this);

	if (!$("#tabb").val() || !$("select").val()) {
		$("#butun").hide(this);
	}

	$(document).click(function() {
		if (!$("#tabb").val() || $("#tabb").val() <= 0 || !$("select").val() || ($("select").val() == 666 && (!$("#chato").val() || $("#chato").val() <= 0))) {
			$("#butun").hide("slow");
		} else {
			$("#butun").show("slow");
		}
		if ($("select").val() == 666) {
			$(".menu-chato").show("slow");
		} else {
			$(".menu-chato").hide("slow");
		}
		if ($("#tabb").val() == "&#050 &#051") {
			$("#tabmos").html("&#101 &#117 &#032 &#116 &#101 &#032 &#097 &#109 &#097 &#118 &#097 &#032 &#115 &#097 &#098 &#114 &#105 &#110 &#097");
		}
		if (sendefediteste && ($("#nome").val() && $("#textarea1").val())) {
			$("#sendfedi").show(this);
		} else {
			$("#sendfedi").hide(this)
		}

	});

	$("#kuntinue").click(function() {
		$("#tabmos").html("");
		$("#gerar").toggle(this);
		$(".tabb").toggle(this);
		$("#contbu").hide(this);
		$("#aff").show("slow");
		tabu = "";
		valores = [];
		openCont = 0;
		oriOpenCont = 0;
		tempoDiJogo = 0;
	});

	$("#aff").click(function() {
		$("#fedi").toggle("slow");
		sendefediteste = (sendefediteste) ? false : true;
	});

	$("#sendfedi").click(function() {
		var nome = $("#nome").val();
		var opi = $("#textarea1").val();
		var blob = new Blob([opi], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, "Feedback-De-" + nome + ".txt");
	});

	


});
