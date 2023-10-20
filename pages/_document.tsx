import Document, { Html, Head, Main, NextScript } from "next/document";
import Modal from "../components/modal";

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta content="Product QR generator" name="QR" />
                    <meta charSet="utf-8" />
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href="/Logo_icon.png"
                    />

                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mukta&family=Open+Sans&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <Modal {...{ Description: "", Title: "" }} />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
