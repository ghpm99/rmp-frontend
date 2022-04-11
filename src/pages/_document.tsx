// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, {
	Html,
	DocumentContext,
	Head,
	Main,
	NextScript,
} from "next/document";
import Script from 'next/script';

import React from "react";

React.useLayoutEffect = React.useEffect;

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<title>Remote Media Player</title>
				</Head>
				<body>
					<Main />
					<NextScript />
					<Script id='percevejo'>
						{`
							(function(p,e,r,c,v,j,o){
								p['PercAgenObject'] = v;p[v]=p[v]||function(){ (p[v].q = p[v].q || []).push(arguments) };p[v].t=1*new Date();
								j=e.createElement(r);j.async=1;j.src=c;m=e.getElementsByTagName(r)[0];m.parentNode.insertBefore(j,m)
							})(window, document, 'script', 'https://pcr.rec.br/pa.js', 'pa');
							pa('create', '8d3c1ae5-f20d-4ab5-9f36-44e66c7cc968'); pa('page-view');

							var urlParams = new URLSearchParams(window.location.search);
							if (urlParams.get('pcrid')) {
							var pa_data = {
									"pcrid": urlParams.get('pcrid'),
									"utm_source": urlParams.get('utm_source'),
									"utm_medium": urlParams.get('utm_medium'),
									"pcrtt": urlParams.get('pcrtt'),
							};
							pa('custom', 'affiliate-hook', { fields: pa_data});
								}
						`}
					</Script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;