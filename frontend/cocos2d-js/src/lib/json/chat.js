define(['protocol'], function(protocol){

    var MSG = protocol.MSG;

    var Chat = function (socket) {
        this.socket = socket;
    };

    Chat.prototype.sendMessage = function (room, text) {
        //var message = {
        //    room: room,
        //    text: text,
        //};
        this.socket.emit(MSG.message, {
            room: room,
            text:text
        });
    };

    Chat.prototype.processCommand = function (command) {
        var words = command.split(' ');
        var command = words[0].substring(1, words[0].length).toLowerCase();
        var message = false;
        switch (command) {
            case 'join':
                words.shift();
                var room = words.join(' ');
                this.socket.emit(MSG.join, {
                    newRoom: room
                });
                break;
            case 'name':
                words.shift();
                var userName = words.join(' ');
                this.socket.emit(MSG.changeName, userName);
                break;
            default:
                message = 'Unknow Command:' + command;
                break;
        }
    };

    return {
        Chat:Chat
    };
});