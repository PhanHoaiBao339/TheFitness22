/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter.js';
import Style from '@ckeditor/ckeditor5-style/src/style.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextPartLanguage from '@ckeditor/ckeditor5-language/src/textpartlanguage.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Title from '@ckeditor/ckeditor5-heading/src/title.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	Essentials,
	FindAndReplace,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	// ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	MediaEmbed,
	MediaEmbedToolbar,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	SimpleUploadAdapter,
	Style,
	Table,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Title,
	Underline
];

// // Editor configuration.
// Editor.defaultConfig = {
// 	toolbar: {
// 		items: [
// 			'undo',
// 			'redo',
// 			'|',
// 			'fontSize',
// 			'heading',
// 			'style',
// 			'|',
// 			'bold',
// 			'underline',
// 			'italic',
// 			'|',
// 			'bulletedList',
// 			'numberedList',
// 			'|',
// 			'outdent',
// 			'indent',
// 			'alignment',
// 			'|',
// 			'insertTable',
// 			'blockQuote',
// 			'removeFormat',
// 			'findAndReplace',
// 			'-',
// 			'link',
// 			'imageUpload',
// 			'mediaEmbed',
// 			'imageInsert',
// 			'textPartLanguage'
// 		],
// 		shouldNotGroupWhenFull: true
// 	},
// 	language: 'en',
// 	image: {
// 		toolbar: [
// 			'imageTextAlternative',
// 			'toggleImageCaption',
// 			'imageStyle:inline',
// 			'imageStyle:block',
// 			'imageStyle:side'
// 		]
// 	},
// 	table: {
// 		contentToolbar: [
// 			'tableColumn',
// 			'tableRow',
// 			'mergeTableCells',
// 			'tableProperties'
// 		]
// 	}
// };

export default Editor;
