(function() {

	if (parent && parent.closeModal) {
		window.close = function() {
			try { parent.closeModal(); } catch (ex) {}
		};
	}

    window.showModalDialog = window.showModalDialog || function(url, arg, opt) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'dialogWidth:300px;dialogHeight:200px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles

        var dialog = document.body.appendChild(document.createElement('dialog'));
        dialog.setAttribute('style', opt.replace(/dialog/gi, ''));
        dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 20px; color: #000; text-decoration: none; outline: none;">&times;</a><iframe id="dialog-body" src="' + url + '" style="border: 0; width: 100%; height: 100%;"></iframe>';
        document.getElementById('dialog-body').contentWindow.dialogArguments = arg;
        document.getElementById('dialog-close').addEventListener('click', function(e) {
            e.preventDefault();
            dialog.close();
        });
        dialog.showModal();
		
		var documentHtml = document.documentElement.innerHTML;
		var regex = /<script>window.showModalDialog\((.*?)\);(.*?)<\/script>/g;
		var match = regex.exec(documentHtml);
		var nextStatement = match[2];
		
        dialog.addEventListener('close', function() {
            document.getElementById('dialog-body').contentWindow.returnValue;
            document.body.removeChild(dialog);
			eval(nextStatement);
        });
		
		window.closeModal = function () { dialog.close(); }

        throw 'Execution stopped until showModalDialog is closed';
    };
	
})();