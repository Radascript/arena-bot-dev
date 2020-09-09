const Discord = require('discord.js');

const client = new Discord.Client();

queue = [];
prefix = "!que";

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	const pinger = message.member.user.tag;

	queueRouter(command, args, pinger, message);

	message.channel.send(msg);
});

function queueRouter(command, args, pinger, message) {

	msg = "";

	if ( command === '-join' || command === 'ue-join' ) {

		//If someone was tagged, add them. If noone was tagged, add the person that sent the message
		if (!args.length) {
			tag = pinger;
		}
		else {
			tag = message.mentions.users.first().tag;
		}

		//If person is already in the queue, don't double dip
		if (queue.includes(tag)) {
			msg = tag + " is already in the queue - no double dipping!";
			msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
		}

		else {
			queue.push(tag);
			msg = "Queue:" + "\n" + queue.join('\n');
		}
		
	}



	else if ( command === '-out' || command === '-remove' || command === 'ue-out' || command === 'ue-remove' ) {
		if (!args.length) {
			tag = pinger;
		}
		else {
			tag = message.mentions.users.first().tag;
		}

	  	removeA(queue, tag);
	  	msg = "User " + tag + " hopped out of the queue vent!";

	  	if (queue.length < 1) {
			msg = msg + " Queue is now empty.";
		}
		else {
			msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
		}	  	
	}



	else if (command === '-reset' || command === 'ue-reset') {
		queue = [];
		msg = "Queue is now empty!";
	}



	else if (command === '-show' || command === 'ue-show' ) {
		if (queue.length < 1) {
			msg = "No one in the queue!";
		}
		else {
			msg = "Queue:" + "\n" + queue.join('\n')
		}
	}

	else if (command === '-help' || command === 'ue-help' ) {
		msg = msg + "Queue Bot Commands:"+"\n";
		msg = msg + "!que-join or !que-join @user to add a user to the queue"+"\n";
		msg = msg + "!que-out or !que-out @user to remove a user from the queue"+"\n";
		msg = msg + "!que-reset to remove all users from the queue"+"\n";
		msg = msg + "!que-show to show current queue"+"\n";
		msg = msg + "!que-help to show commands";
	}

	else if ( command === '-up' || command === 'ue-up' || command === '-down' || command === 'ue-down' ) {
		if (!args.length) {
			tag = pinger;
		}
		else {
			tag = message.mentions.users.first().tag;
		}

		if (!queue.includes(tag)) {
			msg = "User " + tag + " is not in the Queue.";
			if (queue.length < 1) {
				msg = msg + " The queue is empty.";
			}
			else {
				msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
			}
		}

		else {
			var old_index = queue.indexOf(tag);
			if ( command === '-up' || command === 'ue-up' ) {
				var new_index = queue.indexOf(tag)-1;
				var direction = "up";
			}
			else {
				var new_index = queue.indexOf(tag)+1;
				var direction = "down";
			}

			if (new_index < 0 || new_index > queue.length - 1) {
				msg = "User " + tag + " cannot be moved " + direction;
				msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
			}
			else {
				move(queue, old_index, new_index);
				msg = "User " + tag + " has been moved " + direction;
				msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
			}

		}
	
	}

	
	else {
		msg = "Can't recognize command. Please use !que-help for list of commands";
	}


	return msg;
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret