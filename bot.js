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

	else {
		msg = "Can't recognize command. Please use !que-help for list of commands";
	}

	// else if ( command === '-up' || command === 'ue-up' ) {
	// 	if (!args.length) {
	// 		tag = pinger;
	// 	}
	// 	else {
	// 		tag = message.mentions.users.first().tag;
	// 	}

	//   	removeA(queue, tag);
	//   	msg = "User " + tag + " has been moved up a spot!";

	//   	if (queue.length < 1) {
	// 		msg = msg + " Queue is now empty.";
	// 	}
	// 	else {
	// 		msg = msg + "\n" + "Queue:" + "\n" + queue.join('\n');
	// 	}	  	
	// }


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

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret