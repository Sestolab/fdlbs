CKEDITOR.plugins.add('fdlbs', {
	requires: 'dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'fdlbs,rmfdlbs',

	init: function(editor){
		editor.addCommand('fdlbs', new CKEDITOR.dialogCommand('fdlbsDialog', {
			allowedContent: 'i,span[!class];a[!class,!href,target]'
		}));
		editor.addCommand('removefdlbs', {
			exec: function(editor){
				var el = editor.getSelection().getStartElement().rmClass(/label|badge|primary|secondary|success|alert|warning/g);
				if (el.is('span') && !el.hasAttributes())
					el.remove(true);
			}
		});

		editor.ui.addButton('fdlbs', {
			label: editor.lang.fdlbs.buttonLabel,
			command: 'fdlbs'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('fdlbsGroup');
			editor.addMenuItems({
				fdlbsItem: {
					label: editor.lang.fdlbs.buttonLabel,
					icon: 'fdlbs',
					command: 'fdlbs',
					group: 'fdlbsGroup'
				},
				rmfdlbs: {
					label: editor.lang.fdlbs.remove,
					icon: 'rmfdlbs',
					command: 'removefdlbs',
					group: 'fdlbsGroup'
				}
			});

			editor.contextMenu.addListener(function(element){
				if (element.is('span', 'a') && !element.hasClass('button'))
					return {
						fdlbsItem: CKEDITOR.TRISTATE_OFF,
						rmfdlbs: element.matchClass(/label|badge/) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
					};
			});
		}

		CKEDITOR.dialog.add('fdlbsDialog', this.path + 'dialogs/fdlbs.js');
	}
});

