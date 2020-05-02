$(function(){
	const socket = io();

	//opteniendo los elementos de DOM desde la interfaz
	const $messageForm = $('#message-form');
	const $messageBox = $('#message');
	const $chat = $('#chat');

	//opteniendo datos del nickname form
	const $nickForm = $('#nickForm');
	const $nickError = $('#nickError');
	const $nickname = $('#nickname');

	const $users = $('#usernames');

	$nickForm.submit(e =>{
		e.preventDefault();
		socket.emit('new user', $nickname.val(),data =>{
			if (data) {
				$('#nickWrap').hide();
				$('#contentWrap').show();
			}else{
				$nickError.html(`
					<div class="alert alert-danger">
						él usuario ya existe ...
					</div>
				`);
			}
			$nickname.val('');
		});
	});

	//eventos
	$messageForm.submit( e =>{
		e.preventDefault();
		socket.emit('send message', $messageBox.val(),data =>{
			$chat.append(`<p class="error">${data}</p>`);
		});
		$messageBox.val('');
		
	});



	socket.on('new message', function(data){
		$chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
	});




	socket.on('usernames',data=>{
		let html = '';
		for (let i = 0; i< data.length;i++){
			html += `<p><i class="fas fa-user">${data[i]}<i></p>`
		}
		$users.html(html);
	});

	socket.on('whisper',data =>{
		$chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
	});



});