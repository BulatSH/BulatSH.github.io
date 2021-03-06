$(function () {
	let $stp = null, data = {gender: ''}, $errmsg = $('#errmsg').eq(0), body_class = $('body').eq(0).attr('class') + ' ';
	$.fn.errmsg = function (msg) {
		return $(this).attr('class', 'error').html(msg);
	};
	$.fn.infmsg = function (msg) {
		return $(this).attr('class', 'info').html(msg);
	};

	$('div.question button').on('click', function () {
		const $btn = $(this), nam = $btn.attr('name'), val = $btn.val();

		if (nam === 'habits') {
			data[nam] = $('input[name=' + nam + ']:checked').length;
		} else if (nam === 'values') {
			$.each($stp.find('label input'), function (i, el) {
				let v = parseInt($(el).val());
				if (!isNaN(v) && v >= parseInt($(el).attr('min')) && v <= parseInt($(el).attr('max'))) {
					$(el).parent().removeClass('invalid');
					data[$(el).attr('name')] = $(el).val();
				} else {
					$(el).parent().addClass('invalid');
				}
			});

			if ($stp.find('label.invalid').length) {
				return;
			}

			let count = 0;
			let timeId = setInterval(function() {
				if (count > 100) {
					clearInterval(timeId);
					setTimeout(function () {
						$stp.hide();
						$stp = $('div.result').show();
						$('body').attr('class', body_class + 'result');
					}, 1000);
					return;
				}

				$('div.load .indicator__title').html(count + '%');
				$('div.load .indicator__bar-line, .load .indicator__bar-shadow').css('width', count + '%');

				count++;
			}, 120);

			let xhr = $.ajax({
				url: '/calculate',
				type: 'post',
				dataType: 'json',
				data: data
			}).done(function (resp) {
				if (resp.hasOwnProperty('imt')) {
					$.each(resp, function (nam, val) {
						$('.' + nam).text(val);
					});
					$('.imts').text(imts(resp.imt));
				}
				else {
					console.log(resp);
					console.log(xhr);
				}
			}).fail(function (xhr, err) {
				console.log(err);
				console.log(xhr);
			});

		} else {
			data[nam] = val;
		}

		$stp = $btn.parents('div.stp').hide().next('div.stp');
		let cls = $stp.show().attr('class');
		$('body').attr('class', body_class + cls);
		document.body.scrollTop = 0;
		document.body.scrollTo(0, 0);
	});

	$('#genders .buttons button').on('click', function () {
		data.gender = $(this).val();
		$('div.img-box img').attr('src', '/img/gender' + data.gender + '.png').addClass('gender' + data.gender);
		$('#genders').eq(0).hide();
		$stp = $('div.stp').eq(0).show();
		let cls = $stp.attr('class');
		$('body').attr('class', body_class + cls);
		// document.body.scrollTop = 0;
		// document.body.scrollTo(0, 0);
	});

	const $passview = $('.pass_view');
	$passview.length && $passview.on('click', function () {
		let $pass = $(this).prev();
		if ($pass.attr('type') === 'password') {
			$pass.attr('type', 'text');
		}
		else {
			$pass.attr('type', 'password');
		}
	});

	$('div.result button').on('click', function () {
		$('div.result').hide();
		$('div.pay').show();
		location.href = '/tarif';
	});

	$('div.pay button').on('click', function () {
		const $btn = $(this).attr('disabled', 'disabled');
		let xhr = $.ajax({
			url: '/payinit',
			type: 'post',
			dataType: 'json'
		}).done(function (resp) {
			if (resp.hasOwnProperty('errmsg')) {
				$errmsg.errmsg(resp.errmsg);
				$btn.removeAttr('disabled');
				return;
			}

			if (resp.hasOwnProperty('html') && typeof resp.html === 'string' && resp.html.length) {
				resp.html = decodeURIComponent(resp.html);
				$(resp.html).appendTo($('body').eq(0));
				return;
			}

			if (resp.hasOwnProperty('redirect') && typeof resp.redirect === 'string' && resp.redirect.length) {
				window.location.replace(resp.redirect);
				return;
			}

			$errmsg.errmsg(xhr.responseText);
			$btn.removeAttr('disabled');

		}).fail(function (xhr, err) {
			$errmsg.errmsg(err + ':' + xhr.statusText + '<br />' + xhr.responseText);
			$btn.removeAttr('disabled');
		});
	});

	let $inp = $(".form_input");
	if ($inp.length) {
		$inp.each(function (i, el) {
			!$(el).val() && $(el).addClass('empty');
		});

		$inp.on('input', function () {
			$(this).val($(this).val().trim());
			$(this).val() ? $(this).removeClass('empty') : $(this).addClass('empty');
			let frm = $(this).parents('form')[0], $btn = $(frm).find('button[type=submit]');
			frm.checkValidity() ? $btn.addClass('_valid') : $btn.removeClass('_valid');
		});

		$inp.eq(0).trigger('input');
	}

	// $(".modal-wrapper").modal({
	// 	escapeClose: false,
	// 	clickClose: false,
	// 	showClose: false
	// });
	
	/*let inputSet = document.querySelectorAll('.post-form__code-group .code_char');
	inputSet.forEach(function(elem){
		elem.addEventListener('input', function(){
			let val = this.value.replace(/\D/g, '');
			let that = this;
			if (val.length > 1) val = val.substr(0, 1);
			this.value = val;
			if (val.length === 1 && this.nextElementSibling) {
				setTimeout(function() {
					that.nextElementSibling.select();
				});
			};
		});
		elem.addEventListener('focus', function(){
			this.select();
		})
	});*/

	let $inps = $('#verify_form .code_char');
	if ($inps.length) {
		$('html').addClass('fixfixed');
		$('body').addClass('fixfixed');
		$('.blocker').addClass('fixfixed');
		$('.modal-wrapper.modal').addClass('fixfixed');
		$inps.on({
			'input': function () {
				let val = $(this).val().replace(/\D/g, '').trim();
				let $that = $(this);
				if (val.length > 1) val = val.substr(0, 1);
				$(this).val(val);
				if (val.length === 1 && $(this).next('input.code_char').length) {
					setTimeout(() => {$that.next('input.code_char').trigger('click')});
				}
				
				// if (val.length === 1 && $(this).next('input.code_char').length) setTimeout(() => {$that.next('input.code_char').select()});
				// if (val.length === 1 && $(this).next('input.code_char').length) setTimeout(() => {$that.next('input.code_char').focus()});
				// console.log('onInput   ', $that.next('input.code_char')[0]);

				// let $btn = $('form.post-form button');
				// if ($('input.code_char').toArray().filter(function (i) {
				// 	return i.value.length;
				// }).length === 6) {
				// 	!$btn.hasClass('_valid') && $btn.addClass('_valid');
				// } else {
				// 	$btn.hasClass('_valid') && $btn.removeClass('_valid');
				// }
			},
			'keyup': function (ev) {
				let $that = $(this);
				if (ev.keyCode === 8 && !$(this).val() && $(this).prev('input.code_char').length) {
					setTimeout(() => {$that.prev('input.code_char').trigger('click')});
					// $(this).prev('input.code_char').focus();
				} else if (ev.keyCode === 37 && $(this).prev('input.code_char').length) {
					setTimeout(() => {$that.prev('input.code_char').trigger('click')});
					// $(this).prev('input.code_char').focus();
				} else if (ev.keyCode === 39 && $(this).next('input.code_char').length) {
					setTimeout(() => {$that.next('input.code_char').trigger('click')});
					// $(this).next('input.code_char').focus();
				}
			},
			'click': function() {
				if ($(this).val()) {
					$(this).select()
				} else $(this).focus();
			}
		});
	}

	$(document)
    .on('focus', 'input', function(e) {
				$('html').addClass('fixfixed');
				$('body').addClass('fixfixed');
				$('.blocker').addClass('fixfixed');
				$('.modal-wrapper.modal').addClass('fixfixed');

        // $('*').filter(function() {
        //     return $(this).css("position") === 'fixed';
        // }).addClass('fixfixed');
    })
    // .on('blur', 'input', function(e) {
		// 		$('html').removeClass('fixfixed');
		// 		$('body').removeClass('fixfixed');
		// 		$('.blocker').removeClass('fixfixed');
    //     $('.modal-wrapper.modal').removeClass('fixfixed');
    //     $('*').filter(function() {
    //          return $(this).css("position") === 'fixed';
    //     }).removeClass('fixfixed');
    // });

	let $newmail = $('#newmail'), $newpass = $('#newpass'), $newname = $('#newname');
	$('#editmail').on('click', function () {
		let $btn = $(this);
		if ($btn.hasClass('save')) {
			$.ajax({
				url: '/lk',
				dataType: 'json',
				type: 'post',
				data: {newmail: $newmail.val()},
			}).done(function (resp) {
				if (resp.hasOwnProperty('error') && resp.hasOwnProperty('mail')) {
					if (resp.error) {
						$('#errmsg').errmsg(resp.error);
						return;
					}
					$newmail.val(resp.mail).attr('readonly', 'readonly');
					$btn.removeClass('save').text('Редактировать');
				}
			}).fail(function (xhr, err) {
				console.log(xhr);
				$('#errmsg').errmsg(err + ': ' + xhr.statusText);
			});
		}
		else {
			$newmail.removeAttr('readonly').select();
			$btn.data('val', $newmail.val());
			$btn.addClass('save').text('Сохранить');
		}
	});
	$newmail.on({
		'keyup': function (ev) {
			let $btn = $('#editmail');
			if (ev.keyCode === 13) {
				$btn.trigger('click');
			}
			else if (ev.keyCode === 27) {
				$newmail.val($btn.data('val')).attr('readonly', 'readonly');
				$btn.removeClass('save').text('Редактировать');
			}
		}
	});
	$('#editpass').on('click', function () {
		let $btn = $(this);
		if ($btn.hasClass('save')) {
			$.ajax({
				url: '/lk',
				dataType: 'json',
				type: 'post',
				data: {newpass: $newpass.val()},
			}).done(function (resp) {
				if (resp.hasOwnProperty('error') && resp.hasOwnProperty('pass')) {
					if (resp.error) {
						$('#errmsg').errmsg(resp.error);
						return;
					}
					$newpass.val(resp.pass).attr('readonly', 'readonly');
					$btn.removeClass('save').text('Редактировать');
				}
				else {
					$('#errmsg').errmsg(JSON.stringify(resp));
				}
			}).fail(function (xhr, err) {
				console.log(xhr);
				$('#errmsg').errmsg(err + ': ' + xhr.statusText);
			});
		}
		else {
			$newpass.removeAttr('readonly').select();
			$btn.data('val', $newpass.val());
			$btn.addClass('save').text('Сохранить');
		}
	});
	$newpass.on({
		'keyup': function (ev) {
			let $btn = $('#editpass');
			if (ev.keyCode === 13) {
				$btn.trigger('click');
			}
			else if (ev.keyCode === 27) {
				$newpass.val($btn.data('val')).attr('readonly', 'readonly');
				$btn.removeClass('save').text('Редактировать');
			}
		}
	});
	$('#editname').on('click', function () {
		let $btn = $(this);
		if ($btn.hasClass('save')) {
			$.ajax({
				url: '/lk',
				dataType: 'json',
				type: 'post',
				data: {newname: $newname.val()},
			}).done(function (resp) {
				if (resp.hasOwnProperty('error') && resp.hasOwnProperty('name')) {
					if (resp.error) {
						$('#errmsg').errmsg(resp.error);
						return;
					}
					$newname.val(resp.name).attr('readonly', 'readonly');
					$btn.removeClass('save').text('Редактировать');
					$('#username, #userlogin').text(resp.name);
				}
				else {
					$('#errmsg').errmsg(JSON.stringify(resp));
				}
			}).fail(function (xhr, err) {
				console.log(xhr);
				$('#errmsg').errmsg(err + ': ' + xhr.statusText);
			});
		}
		else {
			$newname.removeAttr('readonly').select();
			$btn.data('val', $newname.val());
			$btn.addClass('save').text('Сохранить');
		}
	});
	$newname.on({
		'keyup': function (ev) {
			let $btn = $('#editname');
			if (ev.keyCode === 13) {
				$btn.trigger('click');
			}
			else if (ev.keyCode === 27) {
				$newname.val($btn.data('val')).attr('readonly', 'readonly');
				$btn.removeClass('save').text('Редактировать');
			}
		}
	});

	$('div.pers-menu__title a.pers-menu__link[href="' + location.pathname + '"]').parent().addClass('pers-menu-active');

	let $days_col = $('div.program-days-col');
	if ($days_col.length) {
		let href = $('a.save-diet').eq(0).attr('href');
		for (let i = 0; i < $days_col.length; i++) {
			let $col = $days_col.eq(i);
			for (let j = 1; j <= 10; j++) {
				let d = (i * 10 + j).toString(), $a = $('<a>').attr({'class': 'program-days-row', href: href + '&html=' + d}).text(d + ' день');
				$col.append($a);
				$a.on('click', function(ev) {
					ev.preventDefault();
					$.get($(this).attr('href'), function (h) {
						$('body').eq(0).css('overflow-y', 'hidden').append($(h));
					});
					return false;
				});
			}
		}
	}

	$('a.desc__dropdown').on('click', function (ev) {
		ev.preventDefault();
		$(this).parent('.accordion').toggleClass('opened');

	});

	let $imtH = $('#imt_height'), $imtW = $('#imt_weight'), $imt = $('#imt'), $imts = $('#imts');
	if ($imt) {
		$('#imt_weight, #imt_height').on({'blur':function () {
				let w = $imtW.val(), h = $imtH.val(), imt = parseFloat($imt.text()).toFixed(1);
				if (w.length && /^\d+$/g.test(w) && parseInt(w) > 20 && h.length && /^\d+$/g.test(h) && parseInt(h) > 120) {
					w = parseInt(w);
					h = parseInt(h);
					imt = Math.round(100000 * w / Math.pow(h, 2)) / 10
					$imt.text(imt.toString());
					$imts.text(imts(imt));
				}
			}, 'keyup': function (ev) {
				if (ev.keyCode === 13) $(this).trigger('blur');
			}
		});
		$imts.text(imts(parseFloat($imt.text())));
	}

	$('.desc__item>.desc__header').on('click', function (ev) {
		if (!$('div.pers-menu__title-cont:hidden').length) return;

		$('.modal-menu').addClass('_open');
		$("body").on({
			click:function () {
				$('.modal-menu').removeClass('_open');
				$("body").off('click keyup');
			},
			keyup: function (ev) {
				if (ev.keyCode === 27) {
					$('.modal-menu').removeClass('_open');
					$("body").off('click keyup');
				}
			}
		});
		ev.preventDefault();
		ev.stopPropagation();
	});
	$('.modal-menu .desc__header[href="' + location.pathname + '"]').addClass('active').attr('href', 'javascript:{}');

	if (typeof wHist === 'object') {
		let $htbl = $('#history_weight tbody'), dataX = [], dataY = [];
		$.each(wHist, function (dt, v) {
			dt = dt.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$3.$2.$1');
			$htbl.append($('<tr><td>' + dt + '</td><td>' + v + ' кг</td></tr>'));
			dataX.push(dt);
			dataY.push(v);
		});

		$('#hist_weight').on('keyup', function (ev) {
			if (ev.keyCode === 13) {
				let $inp = $(this), v = parseFloat($inp.val());
				if (v > parseInt($inp.attr('max')) || v < parseInt($inp.attr('min'))) return;
				$inp.attr('readonly', 'readonly');

				$.ajax({
					url: location.href,
					dataType: 'json',
					type: 'post',
					data: {weight: v},
				}).done(function (resp) {
					if (resp.hasOwnProperty('error') && resp.hasOwnProperty('weight') && resp.hasOwnProperty('dat')) {
						if (resp.error) {
							$('#errmsg').errmsg(resp.error);
							$inp.removeAttr('readonly');
							return;
						}
						$inp.val(resp.weight);
						$htbl.append($('<tr><td>' + resp.dat + '</td><td>' + resp.weight + ' кг</td></tr>'));
					}
					else {
						$('#errmsg').errmsg(JSON.stringify(resp));
						$inp.removeAttr('readonly');
					}
				}).fail(function (xhr, err) {
					console.log(xhr);
					$('#errmsg').errmsg(err + ': ' + xhr.statusText);
					$inp.removeAttr('readonly');
				});
			}
		});

		let ctx = document.getElementById('myhist').getContext('2d');
		let myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dataX,
				datasets: [{
					label: 'Cubic interpolation (monotone)',
					data: dataY,
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 3,
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					fill: true/*,
			cubicInterpolationMode: 'monotone',
			tension: 0.4*/
				}]
			},
			options: {
				scales: {
					y: {
						min: 40,
						max: 120
					}
				}
			}
		});
	}
});