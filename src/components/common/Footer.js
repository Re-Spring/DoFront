import  "../../styles/mains/footer.css";
import  "../../styles/common/common.css";

function Footer () {

    return (
        <>
        <div className="footerBox">
            <div className="footerWrap">
                <div className="footerLeft">
                    <div><img src="../images/footerlogo.png" alt="" className="footerLogo"/></div>
                    <div className="Information">
                        <p className="footerName">(주)Re:Spring</p>
                        <ul className="listBox">
                            <li style={{lineHeight:"500%"}}>회사 소개 | 이용약관 | 개인정보처리방침 | 대량주문안내</li>
                            <li>주소 : 서울특별시 서초구 서초대로77길 13</li>
                            <li>대표자 : 박지영, 이동주, 조현진, 이선호, 신주현</li>
                            <li>eMail : respring01@gmail.com</li>
                        </ul>
                    </div>
                </div>
                
                <div className="iconBox">
                    <img src="../images/instagram.png" alt="" className="footerIcon"/>
                    <img src="../images/youtube.png" alt="" className="footerIcon"/>
                    <img src="../images/blog.png" alt="" className="footerIcon"/>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer;