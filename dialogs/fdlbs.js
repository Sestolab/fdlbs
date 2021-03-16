CKEDITOR.dialog.add('fdlbsDialog', function(editor){
	var lang = editor.lang.fdlbs;

	return {
		title: lang.title,
		minWidth: 400,
		minHeight: 150,
		contents: [
			{
				id: 'tab-basic',
				label: lang.tabBasic,
				elements: [
					{
						id: 'txt',
						type: 'text',
						required: true,
						label: lang.txtLabel,
						setup: function(element){
							this.setValue(element.getText().trim());
						},
						commit: function(element){
							element.setText(this.getValue() || 'Label/Badge');
						}
					},
					{
						id: 'style',
						type: 'select',
						label: lang.styleLabel,
						items: [
							[lang.default, ''],
							[lang.primary, 'primary'],
							[lang.secondary, 'secondary'],
							[lang.success, 'success'],
							[lang.alert, 'alert'],
							[lang.warning, 'warning']
						],
						setup: function(element){
							this.setValue(element.matchClass(new RegExp(this.getValues().join('|'))) || '');
						},
						commit: function(element){
							if (!element.hasClass(this.getValue()))
								element.toggleClass(this.getValue(), this.getValues());
						}
					},
					{
						id: 'badge',
						type: 'checkbox',
						label: lang.badge,
						setup: function(element){
							this.setValue(element.hasClass('badge'));
						},
						commit: function(element){
							if (element.hasClass('badge') != this.getValue())
								element.toggleClass('badge', /label/);
						}
					}
				]
			},

			{
				id: 'tab-link',
				label: lang.tabLink,
				elements: [
					{
						id: 'url',
						type: 'text',
						label: 'URL',
						setup: function(element){
							this.setValue(element.getAttribute('href'));
						},
						commit: function(element){
							if (this.getValue()){
								element.renameNode('a');
								element.setAttribute('href', this.getValue());
							}else{
								element.removeAttributes(['href', 'target']);
								element.renameNode('span');
							}
						}
					},
					{
						id: 'target',
						type: 'select',
						label: lang.targetLabel,
						items: [
							[lang.notSet, ''],
							[lang.targetBlank, '_blank'],
							[lang.targetTop, '_top'],
							[lang.targetSelf, '_self'],
							[lang.targetParent, '_parent']
						],
						setup: function(element){
							this.setValue(element.getAttribute('target') || '');
						},
						commit: function(element){
							if (element.is('a') && element.getAttribute('target') != (this.getValue() || null))
								element.toggleAttribute('target', this.getValue());
						}
					}
				]
			},

			{
				id: 'tab-icon',
				label: lang.tabIcon,
				elements: [{
					id: 'ico',
					type: 'text',
					label: lang.tabIcon,
					setup: function(element){
						if (element.getFirst().$.nodeName == 'I')
							this.setValue(element.getFirst().getAttribute('class'));
					},
					commit: function(element){
						if(this.getValue()){
							var icon = editor.document.createElement('i');
							icon.setHtml('&nbsp;');
							icon.setAttribute('class', this.getValue());
							icon.insertBefore(element.getFirst());
						}
					}
				}]
			}
		],

		onShow: function(){
			var element = editor.getSelection().getStartElement();
			if (element)
				element = element.getAscendant({'span':1, 'a':1}, true);
			if (!element){
				element = editor.document.createElement('span');
				this.insertMode = true;
			}else
				this.insertMode = false;
			this.element = element;
			if (!this.insertMode)
				this.setupContent(this.element);
		},

		onOk: function(){
			this.commitContent(this.element);
			this.element.toggleClass(!this.element.matchClass(/label|badge/) ? 'label' : null);
			if (this.insertMode)
				editor.insertElement(this.element);
		}
	};
});

