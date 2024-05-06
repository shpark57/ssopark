import React, {useState, useEffect, useContext, ChangeEvent} from 'react';

import Container from '@mui/material/Container';



interface Interface {
    type:string
}


const TermsOfUse:React.FC<Interface> =  (props) =>  {
        let div;

        if(props.type == 'TermsofUse'){
            div =  <div dangerouslySetInnerHTML={ {__html: `<p>서비스 이용약관 (상품, 서비스 등 이용 일반 회원용)</p><p><strong>제1조(목적)</strong></p><ol><li><p>본 약관은 승현네가 운영하는 온라인 쇼핑몰 'https://farm.shnea.kr'에서 제공하는 서비스(이하 '서비스'라 합니다)를 이용함에 있어 당사자의 권리 의무 및 책임사항을 규정하는 것을 목적으로 합니다.</p></li><li><p>PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 본 약관을 준용합니다.</p></li></ol><p><strong>제2조(정의)</strong></p><ol><li><p>'회사'라 함은, '승현네'가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을 운영하는 사업자를 말하며, 아울러&nbsp; 'https://farm.shnea.kr'을 통해 제공되는 전자상거래 관련 서비스의 의미로도 사용합니다.</p></li><li><p>'이용자'라 함은, '사이트'에 접속하여 본 약관에 따라 '회사'가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p></li><li><p>'회원'이라 함은, '회사'에 개인정보를 제공하고 회원으로 등록한 자로서, '회사'의 서비스를 계속하여 이용할 수 있는 자를 말합니다.</p></li><li><p>'비회원'이라 함은, 회원으로 등록하지 않고, '회사'가 제공하는 서비스를 이용하는 자를 말합니다.</p></li><li><p>'상품'이라 함은 '사이트'를 통하여 제공되는 재화 또는 용역을 말합니다.</p></li><li><p>'구매자'라 함은 '회사'가 제공하는 '상품'에 대한 구매서비스의 이용을 청약한 '회원' 및 '비회원'을 말합니다.</p></li></ol><p><strong>제3조(약관 외 준칙)</strong></p><p>본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한 서비스의 개별 약관, 운영정책 및 규칙(이하 '세부지침'이라 합니다)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할 경우에는 세부지침이 우선합니다.</p><p><br></p><p><br></p><p><strong>제4조(약관의 명시 및 개정)</strong></p><ol><li><p>'회사'는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지, 전화번호, 모사전송번호(FAX), 전자우편주소, 사업자등록번호, 통신판매업신고번호 등을 이용자가 쉽게 알 수 있도록 '회사' 홈페이지의 초기 서비스화면에 게시합니다. 다만 본 약관의 내용은 '이용자'가 연결화면을 통하여 확인할 수 있도록 할 수 있습니다.</p></li><li><p>'회사'는 '이용자'가 약관에 동의하기에 앞서 약관에 정해진 내용 중 청약철회, 배송책임, 환불조건 등과 같은 내용을 '이용자'가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 통하여 '이용자'의 확인을 구합니다.</p></li><li><p>'회사'는 '전자상거래 등에서의 소비자보호에 관한 법률', '약관의 규제에 관한 법률','전자거래기본법', '정보통신망 이용촉진등에 관한 법률', '소비자보호법' 등 관련법령(이하 '관계법령'이라 합니다)에 위배되지 않는 범위내에서 본 약관을 개정할 수 있습니다.</p></li><li><p>'회사'가 본 약관을 개정하고자 할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께 온라인 쇼핑몰의 초기화면에 그 적용일자 7일전부터 적용일자 전날까지 공지합니다. 다만, '이용자'에게 불리한 내용으로 약관을 변경하는 경우 최소 30일 이상 유예기간을 두고 공지합니다.</p></li><li><p>'회사'가 본 약관을 개정한 경우, 개정약관은 적용일자 이후 체결되는 계약에만 적용되며 적용일자 이전 체결된 계약에 대해서는 개정 전 약관이 적용됩니다. 다만, 이미 계약을 체결한 '이용자'가 개정약관의 내용을 적용받고자 하는 뜻을 '회사'에 전달하고 '회사'가 여기에 동의한 경우 개정약관을 적용합니다.</p></li><li><p>본 약관에서 정하지 아니한 사항 및 본 약관의 해석에 관하여는 관계법령 및 건전한 상관례에 따릅니다.</p></li></ol><p><strong>제5조(제공하는 서비스)</strong></p><p>'회사'는 다음의 서비스를 제공합니다.</p><ol><li><p>결제대금 보호서비스, 이용자 문의서비스, 상품 구매평 등 기타 정보 제공</p></li><li><p>기타 '회사'가 정하는 업무</p></li></ol><p><strong>제6조(서비스의 중단 등)</strong></p><ol><li><p>'회사'가 제공하는 서비스는 연중무휴, 1일 24시간 제공을 원칙으로 합니다. 다만 '회사' 시스템의 유지 · 보수를 위한 점검, 통신장비의 교체 등 특별한 사유가 있는 경우 서비스의 전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수 있습니다.</p></li><li><p>'회사'는 전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우, 전기통신사업법에 의한 기간통신사업자가 전기통신서비스를 중지하는 등 부득이한 사유가 발생한 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.</p></li><li><p>'쇼핑몰'은 재화 또는 용역이 품절되거나 상세 내용이 변경되는 경우 장차 체결되는 계약에 따라 제공할 재화나 용역의 내용을 변경할 수 있습니다. 이 경우 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 즉시 공지합니다.</p></li><li><p>'회사'가 서비스를 정지하거나 이용을 제한하는 경우 그 사유 및 기간, 복구 예정 일시 등을 지체 없이 '이용자'에게 알립니다.</p></li></ol><p><strong>제7조(회원가입)</strong></p><ol><li><p>'회사'가 정한 양식에 따라 '이용자'가 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</p></li><li><p>'회사'는 전항에 따라 회원가입을 신청한 '이용자' 중 다음 각호의 사유가 없는 한 '회원'으로 등록합니다.</p><ol><li><p>가입신청자가 본 약관에 따라 회원자격을 상실한 적이 있는 경우. 다만, '회사'의 재가입 승낙을 얻은 경우에는 예외로 합니다.</p></li><li><p>회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는 경우</p></li><li><p>기타 회원으로 등록하는 것이 '회사'의 운영에 현저한 지장을 초래하는 것으로 인정되는 경우</p></li></ol></li><li><p>회원가입 시기는 '회사'의 가입승낙 안내가 '회원'에게 도달한 시점으로 합니다.</p></li></ol><p><strong>제8조(회원탈퇴 및 자격상실 등)</strong></p><ol><li><p>'회원'은 '회사'에 언제든지 탈퇴를 요청할 수 있으며, '회사'는 지체없이 회원탈퇴 요청을 처리합니다. 다만 이미 체결된 거래계약을 이행할 필요가 있는 경우에는 본약관이 계속 적용됩니다.</p></li><li><p>'쇼핑몰'은 다음 각호의 사유가 발생한 경우 '회사'의 자격을 제한 또는 정지시킬 수 있습니다.</p><ol><li><p>회원가입 시 허위정보를 기재한 경우</p></li><li><p>다른 이용자의 정상적인 이용을 방해하는 경우</p></li><li><p>관계법령 또는 본 약관에서 금지하는 행위를 한 경우</p></li><li><p>공서양속에 어긋나는 행위를 한 경우</p></li><li><p>기타 '회원'으로 등록하는 것이 적절하지 않은 것으로 판단되는 경우</p></li></ol></li><li><p>'회사'의 서비스를 1년 동안 이용하지 않는 '회원'의 경우 휴면계정으로 전환하고 서비스 이용을 제한할 수 있습니다.</p></li><li><p>휴면계정 전환 시 계정 활성을 위해 필요한 아이디(ID), 비밀번호, 이름, 중복가입 방지를 위한 본인 인증값(DI), 휴대전화 번호를 제외한 나머지 정보는&nbsp;삭제됩니다. 다만, 관계법령에 의해 보존할 필요가 있는 경우 '회사'는 정해진 기간 동안 회원정보를 보관합니다.</p></li></ol><p><strong>제9조(회원에 대한 통지)</strong></p><ol><li><p>'회사'는 '회원' 회원가입 시 기재한 전자우편, 이동전화번호, 주소 등을 이용하여 '회원'에게 통지 할 수 있습니다.</p></li><li><p>'회사'가 불특정 다수 '회원'에게 통지하고자 하는 경우 1주일 이상 '사이트'의 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만 '회원'이 서비스를 이용함에 있어 중요한 사항에 대하여는 개별 통지합니다.</p></li></ol><p><strong>제10조(구매신청)</strong></p><p>'이용자'는 온라인 쇼핑몰 상에서 다음 방법 또는 이와 유사한 방법에 따라 구매를 신청할 수 있으며, '회사'는 '이용자'를 위하여 다음 각호의 내용을 알기 쉽게 제공하여야 합니다.</p><ol><li><p>재화 또는 용역의 검색 및 선택</p></li><li><p>성명, 주소, 연락처, 전자우편주소 등 구매자 정보 입력</p></li><li><p>약관내용, 청약철회가 제한되는 서비스, 배송료 등 비용부담과 관련된 내용에 대한 확인 및 동의 표시</p></li><li><p>재화 또는 용역 등에 대한 구매신청 및 확인</p></li><li><p>결제방법 선택 및 결제</p></li><li><p>'회사'의 최종 확인</p></li></ol><p><strong>제11조(계약의 성립)</strong></p><ol><li><p>'회사'는 다음 각호의 사유가 있는 경우 본 약관의 '구매신청' 조항에 따른 구매신청을 승낙하지 않을 수 있습니다.</p><ol><li><p>신청 내용에 허위, 누락, 오기가 있는 경우</p></li><li><p>회원자격이 제한 또는 정지된 고객이 구매를 신청한 경우</p></li><li><p>재판매, 기타 부정한 방법이나 목적으로 구매를 신청하였음이 인정되는 경우</p></li><li><p>기타 구매신청을 승낙하는 것이 '회사'의 기술상 현저한 지장을 초래하는 것으로 인정되는 경우</p></li></ol></li><li><p>'회사'의 승낙이 본 약관의 '수신확인통지' 형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.</p></li><li><p>'회사'가 승낙의 의사표시를 하는 경우 이용자의 구매신청에 대한 확인 및 판매가능여부, 구매신청의 정정 및 취소 등에 관한 정보가 포함되어야 합니다.</p></li></ol><p><strong>제12조(결제방법 및 일반회원의 이용 수수료)</strong></p><ol><li><p>'회사'의 '사이트'에서 구매한 상품에 대한 대금은 다음 각호의 방법으로 결제할 수 있습니다.</p><ol><li><p>선불카드, 직불카드, 신용카드 등 각종 카드결제</p></li><li><p>간편결제</p></li></ol></li><li><p>'회사'는 '구매자'가 결제수단에 대한 정당한 사용권한을 가지고 있는지 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.</p></li><li><p>'회사'의 정책 및 결제업체(이동통신사, 카드회사 등) 또는 결제대행업체(PG)의 기준에 따라 이용자 당 월 누적 결제액 및 충전한도정당한 사용권한을 가지고 있는지 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.</p></li><li><p>'회사'의 정책 및 결제업체(이동통신사, 카드회사 등) 또는 결제대행업체(PG)의 기준에 따라 '구매자' 당 월 누적 결제액 및 충전한도가 제한될 수 있습니다.</p></li><li><p>대금의 지급 또는 결제를 위하여 입력한 정보에 대한 책임은 '구매자'가 전적으로 부담합니다.</p></li><li><p>일반회원은 회사의 서비스 이용대가로 수수료, 회원료 등 각 상품의 구매시 또는 별도로 회사가 정한 회사가 정한 요율이나 기준에 따라 서비스 이용료를 지급해야 합니다.</p></li></ol><p><strong>제13조(수신확인통지, 구매신청 변경 및 취소)</strong></p><ol><li><p>'회사'는 '구매자'가 구매신청을 한 경우 '구매자'에게 수신확인통지를 합니다.</p></li><li><p>수신확인통지를 받은 '구매자'는 의사표시의 불일치가 있는 경우 수신확인통지를 받은 후 즉시 구매신청 내용의 변경 또는 취소를 요청할 수 있고, '회사'는 배송 준비 전 '구매자'의 요청이 있는 경우 지체없이 그 요청에 따라 변경 또는 취소처리 하여야 합니다. 다만 이미 대금을 지불한 경우 본 약관의 '청약철회 등'에서 정한 바에 따릅니다.</p></li></ol><p><strong>제14조(재화 등의 공급)</strong></p><ol><li><p>'회사'는 별도의 약정이 없는 이상, '구매자'가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타 필요한 조치를 취합니다. 다만 '회사'가 이미 대금의 전부 또는 일부를 받은 경우에는 대금을 받은 날부터 3 영업일 이내에 필요한 조치를 취합니다.</p></li><li><p>전항의 경우 '회사'는 '구매자'가 상품 등의 공급 절차 및 진행 상황을 확인할 수 있도록 적절한 조치를 취해야합니다.</p></li></ol><p><strong>제15조(환급)</strong></p><p>'회사'는 '구매자'가 신청한 '상품'이 품절, 생산중단 등의 사유로 인도 또는 제공할 수 없게된 경우 지체없이 그 사유를 '구매자'에게 통지합니다. 이 때 '구매자'가 재화 등의 대금을 지불한 경우 대금을 받은 날 부터 3 영업일 이내에 환급하거나 이에 필요한 조치를 취합니다.</p><p><br></p><p><br></p><p><strong>제16조(청약철회)</strong></p><ol><li><p>'회사'와 재화 등의 구매에 관한 계약을 체결한 '구매자'는 수신확인의 통지를 받은 날부터 &nbsp;7일&nbsp;이내에 청약을 철회할 수 있습니다.</p></li><li><p>다음 각호의 사유에 해당하는 경우, 배송받은 재화의 반품 또는 교환이 제한됩니다.</p><ol><li><p>'구매자'에게 책임있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화를 확인하기 위하여 포장 등을 훼손한 경우는 예외로 합니다)</p></li><li><p>'구매자'의 사용 또는 소비에 의하여 재화의 가치가 현저히 감소한 경우</p></li><li><p>시간의 경과로 재판매가 곤란할 정도로 재화의 가치가 현저히 감소한 경우</p></li><li><p>같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본이 되는 재화의 포장을 훼손한 경우</p></li><li><p>'구매자'의 주문에 의하여 개별적으로 생산한 상품으로서 청약철회 및 교환의 제한에 대하여 사전에 고지한 경우</p></li></ol></li><li><p>'회사'가 전항의 청약철회 제한 사유를 '구매자'가 알기 쉽게 명시하거나, 시용상품을 제공하는 등의 조치를 취하지 않은 경우 '구매자'의 청약철회가 제한되지 않습니다.</p></li><li><p>'구매자'는 본조의 규정에도 불구하고 재화등의 내용이 표시, 광고내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화를 공급받은 날로부터 3월 이내, 그 사실을 안날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.</p></li></ol><p><strong>제17조(청약철회의 효과)</strong></p><ol><li><p>'회사'는 '구매자'로부터 재화 등을 반환 받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이때 '회사'가 '구매자'에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여 전자상거래법 시행령 제21조의3 소정의 이율(연 15%)을 곱하여 산정한 지연이자를 지급합니다.</p></li><li><p>'회사'는 위 재화를 환급함에 있어서 '구매자'가 신용카드 또는 전자화폐 등의 결제수단을 사용한 경우에는 지체없이 당해 결제수단을 제공한 사업자로 하여금 재화등의 대금 청구를 정지 또는 취소하도록 요청합니다.</p></li><li><p>청약철회의 경우 공급받은 재화등의 반환에 필요한 비용은 '구매자'가 부담합니다. 다만, 재화등의 내용이 표시 · 광고내용과 다르거나 계약내용과 다르게 이행되어 청약철회를 하는 경우 재화 등의 반환에 필요한 비용은 '회사'가 부담합니다.</p></li><li><p>'회사'는 청약철회시 배송비 등 제반 비용을 누가 부담하는지 '구매자'가 알기 쉽도록 명확하게 표시합니다.</p></li></ol><p><strong>제18조(개인정보보호)</strong></p><ol><li><p>'회사'는 '구매자'의 정보수집시 다음의 필수사항 등 구매계약 이행에 필요한 최소한의 정보만을 수집합니다.</p><ol><li><p>성명</p></li><li><p>주민등록번호 또는 외국인등록번호</p></li><li><p>주소</p></li><li><p>전화번호(또는 이동전화번호)</p></li><li><p>아이디(ID)</p></li><li><p>비밀번호</p></li><li><p>전자우편(e-mail)주소</p></li></ol></li><li><p>'회사'가 개인정보보호법 상의 고유식별정보 및 민감정보를 수집하는 때에는 반드시 대상자의 동의를 받습니다.</p></li><li><p>'회사'는 제공된 개인정보를 '구매자'의 동의 없이 목적외 이용, 또는 제3자 제공할 수 없으며 이에 대한 모든 책임은 '회사'가 부담합니다. 다만 다음의 경우에는 예외로 합니다.</p><ol><li><p>배송업무상 배송업체에게 배송에 필요한 최소한의 정보(성명, 주소, 전화번호)를 제공하는 경우</p></li><li><p>통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우</p></li><li><p>재화 등의 거래에 따른 대금정산을 위하여 필요한 경우</p></li><li><p>도용방지를 위하여 본인 확인이 필요한 경우</p></li><li><p>관계법령의 규정에 따른 경우</p></li></ol></li><li><p>본 약관에 기재된 사항 이외의 개인정보보호에 관항 사항은 '회사'의 '개인정보처리방침'에 따릅니다.</p></li></ol><p><strong>제19조('회사'의 의무)</strong></p><ol><li><p>'회사'는 관계법령, 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 약관이 정하는 바에 따라 지속적 · 안정적으로 재화 및 용역을 제공하는데 최선을 다하여야 합니다.</p></li><li><p>'회사'는 '이용자'가 안전하게 인터넷 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.</p></li><li><p>'회사'가 상품에 대하여 '표시 · 광고의 공정화에 관한 법률' 제3조 소정의 부당한 표시 · 광고행위를 하여 '이용자'가 손해를 입은 때에는 이를 배상할 책임을 집니다.</p></li><li><p>'회사'는 '이용자'의 수신동의 없이 영리목적으로 광고성 전자우편, 휴대전화 메시지, 전화, 우편 등을 발송하지 않습니다.</p></li></ol><p><strong>제20조(이용자 및 회원의 의무)</strong></p><ol><li><p>'이용자'는 회원가입 신청 시 사실에 근거하여 신청서를 작성해야 합니다. 허위, 또는 타인의 정보를 등록한 경우 '회사'에 대하여 일체의 권리를 주장할 수 없으며, '회사'는 이로 인하여 발생한 손해에 대하여 책임을 부담하지 않습니다.</p></li><li><p>'이용자'는 본 약관에서 규정하는 사항과 기타 '회사'가 정한 제반 규정 및 공지사항을 준수하여야 합니다. 또한 '이용자'는 '회사'의 업무를 방해하는 행위 및 '회사'의 명예를 훼손하는 행위를 하여서는 안 됩니다.</p></li><li><p>'이용자'는 주소, 연락처, 전자우편 주소 등 회원정보가 변경된 경우 즉시 이를 수정해야 합니다. 변경된 정보를 수정하지 않거나 수정을 게을리하여 발생하는 책임은 '이용자'가 부담합니다.</p></li><li><p>'이용자'는 다음의 행위를 하여서는 안됩니다.</p><ol><li><p>'회사'에 게시된 정보의 변경</p></li><li><p>'회사'가 정한 정보 외의 다른 정보의 송신 또는 게시</p></li><li><p>'회사' 및 제3자의 저작권 등 지식재산권에 대한 침해</p></li><li><p>'회사' 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위</p></li><li><p>외설 또는 폭력적인 메시지, 화상, 음성 기타 관계법령 및 공서양속에 반하는 정보를 '회사'의 '사이트'에 공개 또는 게시하는 행위</p></li></ol></li><li><p>'회원'은 부여된 아이디(ID)와 비밀번호를 직접 관리해야 합니다.</p></li><li><p>'회원'이 자신의 아이디(ID) 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 '회사'에 통보하고 안내에 따라야 합니다.</p></li></ol><p><strong>제21조(저작권의 귀속 및 이용)</strong></p><ol><li><p>'쇼핑몰'이 제공하는 서비스 및 이와 관련된 모든 지식재산권은 '회사'에 귀속됩니다</p></li><li><p>'이용자'는 '쇼핑몰'에게 지식재산권이 있는 정보를 사전 승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나, 제3자가 이용하게 하여서는 안됩니다.</p></li><li><p>'이용자'가 서비스 내에 게시한 게시물, 이용후기 등 콘텐츠(이하 '콘텐츠')의 저작권은 해당 '콘텐츠'의 저작자에게 귀속됩니다.</p></li></ol><p><strong>제22조(분쟁의 해결)</strong></p><ol><li><p>'회사'는 '이용자'가 제기하는 불만사항 및 의견을 지체없이 처리하기 위하여 노력합니다. 다만 신속한 처리가 곤란한 경우 '이용자'에게 그 사유와 처리일정을 즉시 통보해 드립니다.</p></li><li><p>'회사'와 '이용자'간 전자상거래에 관한 분쟁이 발생한 경우, '이용자'는 한국소비자원, 전자문서 · 전자거래분쟁조정위원회 등 분쟁조정기관에 조정을 신청할 수 있습니다.</p></li><li><p>'회사'와 '이용자'간 발생한 분쟁에 관한 소송은 민사소송법에 따른 관할법원에 제기하며, 준거법은 대한민국의 법령을 적용합니다.</p></li></ol><p><strong>부 칙</strong></p><p><br></p><p><br></p><p><strong>제1조(시행일)</strong></p><p>본 약관은 2024.05.06.부터 적용합니다.</p>`} }></div>
        }else if(props.type == 'privacyPolicy'){
            div =  <div dangerouslySetInnerHTML={ {__html: `<p>개인정보처리방침</p><p><strong>제1조(목적)</strong></p><p>승현네(이하 ‘회사'라고 함)는 회사가 제공하고자 하는 서비스(이하 ‘회사 서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘개인’)의 정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 ‘본 방침’)을 수립합니다.</p><p><br></p><p><br></p><p><strong>제2조(개인정보 처리의 원칙)</strong></p><p>개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.</p><p><br></p><p><br></p><p><strong>제3조(본 방침의 공개)</strong></p><ol><li><p>회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다.</p></li><li><p>회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.</p></li></ol><p><br></p><p><br></p><p><strong>제4조(본 방침의 변경)</strong></p><ol><li><p>본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.</p></li><li><p>회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.</p><ol><li><p>회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법</p></li><li><p>서면·모사전송·전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법</p></li></ol></li><li><p>회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.</p></li></ol><p><br></p><p><br></p><p><strong>제5조(회원 가입을 위한 정보)</strong></p><p>회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은 정보를 수집합니다.</p><ol><li><p>필수 수집 정보:&nbsp;이메일 주소, 비밀번호, 이름 및 휴대폰 번호</p></li></ol><p><br></p><p><br></p><p><strong>제6조(회사 서비스 제공을 위한 정보)</strong></p><p>회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.</p><ol><li><p>필수 수집 정보:&nbsp;아이디, 이메일 주소, 이름 및 연락처</p></li></ol><p><br></p><p><br></p><p><strong>제7조(서비스 이용 및 부정 이용 확인을 위한 정보)</strong></p><p>회사는 이용자의 서비스 이용에 따른 통계∙분석 및 부정이용의 확인∙분석을 위하여 다음과 같은 정보를 수집합니다. (부정이용이란 회원탈퇴 후 재가입, 상품구매 후 구매취소 등을 반복적으로 행하는 등 회사가 제공하는 할인쿠폰, 이벤트 혜택 등의 경제상 이익을 불·편법적으로 수취하는 행위, 이용약관 등에서 금지하고 있는 행위, 명의도용 등의 불·편법행위 등을 말합니다.)</p><ol><li><p>필수 수집 정보:&nbsp;서비스 이용기록 및 쿠키</p></li></ol><p><br></p><p><br></p><p><strong>제8조(개인정보 수집 방법)</strong></p><p>회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.</p><ol><li><p>이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식</p></li><li><p>어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의 개인정보를 입력하는 방식</p></li><li><p>이용자가 고객센터의 상담, 게시판에서의 활동 등 회사의 서비스를 이용하는 과정에서 이용자가 입력하는 방식</p></li></ol><p><br></p><p><br></p><p><strong>제9조(개인정보의 이용)</strong></p><p>회사는 개인정보를 다음 각 호의 경우에 이용합니다.</p><ol><li><p>공지사항의 전달 등 회사운영에 필요한 경우</p></li><li><p>이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우</p></li><li><p>회사의 서비스를 제공하기 위한 경우</p></li><li><p>법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우</p></li></ol><p><br></p><p><br></p><p><strong>제10조(사전동의 등에 따른 개인정보의 제공)</strong></p><ol><li><p>회사는 개인정보 제3자 제공 금지에도 불구하고, 이용자가 사전에 공개하거나 다음 각호 사항에 대하여 동의한 경우에는 제3자에게 개인정보를 제공할 수 있습니다. 다만 이 경우에도 회사는 관련 법령 내에서 최소한으로 개인정보를 제공합니다.</p><ol><li><p>아임포트에게 서비스 이용 시 결제 대행사를 통한 결제을 위하여 회원가입,서비스 이용을 위해 수집한 정보을 제공</p></li></ol></li><li><p>회사는 전항의 제3자 제공 관계에 변화가 있거나 제3자 제공 관계가 종결될 때도 같은 절차에 의해 이용자에게 고지 및 동의를 구합니다.</p></li></ol><p><br></p><p><br></p><p><strong>제11조(개인정보의 보유 및 이용기간)</strong></p><ol><li><p>회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.</p></li><li><p>전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.</p></li></ol><p><br></p><p><br></p><p><strong>제12조(법령에 따른 개인정보의 보유 및 이용기간)</strong></p><p>회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.</p><ol><li><p>전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보 및 보유기간</p><ol><li><p>계약 또는 청약철회 등에 관한 기록 : 5년</p></li><li><p>대금결제 및 재화 등의 공급에 관한 기록 : 5년</p></li><li><p>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p></li><li><p>표시•광고에 관한 기록 : 6개월</p></li></ol></li><li><p>통신비밀보호법에 따른 보유정보 및 보유기간</p><ol><li><p>웹사이트 로그 기록 자료 : 3개월</p></li></ol></li><li><p>전자금융거래법에 따른 보유정보 및 보유기간</p><ol><li><p>전자금융거래에 관한 기록 : 5년</p></li></ol></li><li><p>위치정보의 보호 및 이용 등에 관한 법률</p><ol><li><p>개인위치정보에 관한 기록 : 6개월</p></li></ol></li></ol><p><br></p><p><br></p><p><strong>제13조(개인정보의 파기원칙)</strong></p><p>회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용기간의 경과 등 개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이 파기합니다.</p><p><br></p><p><br></p><p><strong>제14조(개인정보파기절차)</strong></p><ol><li><p>이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기 되어집니다.</p></li><li><p>회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를 거쳐 파기합니다.</p></li></ol><p><br></p><p><br></p><p><strong>제15조(개인정보파기방법)</strong></p><p>회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이로 출력된 개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여 파기합니다.</p><p><br></p><p><br></p><p><strong>제16조(광고성 정보의 전송 조치)</strong></p><ol><li><p>회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 이용자의 명시적인 사전동의를 받습니다. 다만, 다음 각호 어느 하나에 해당하는 경우에는 사전 동의를 받지 않습니다</p><ol><li><p>회사가 재화 등의 거래관계를 통하여 수신자로부터 직접 연락처를 수집한 경우, 거래가 종료된 날로부터 6개월 이내에 회사가 처리하고 수신자와 거래한 것과 동종의 재화 등에 대한 영리목적의 광고성 정보를 전송하려는 경우</p></li><li><p>「방문판매 등에 관한 법률」에 따른 전화권유판매자가 육성으로 수신자에게 개인정보의 수집출처를 고지하고 전화권유를 하는 경우</p></li></ol></li><li><p>회사는 전항에도 불구하고 수신자가 수신거부의사를 표시하거나 사전 동의를 철회한 경우에는 영리목적의 광고성 정보를 전송하지 않으며 수신거부 및 수신동의 철회에 대한 처리 결과를 알립니다.</p></li><li><p>회사는 오후 9시부터 그다음 날 오전 8시까지의 시간에 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우에는 제1항에도 불구하고 그 수신자로부터 별도의 사전 동의를 받습니다.</p></li><li><p>회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음의 사항 등을 광고성 정보에 구체적으로 밝힙니다.</p><ol><li><p>회사명 및 연락처</p></li><li><p>수신 거부 또는 수신 동의의 철회 의사표시에 관한 사항의 표시</p></li></ol></li><li><p>회사는 전자적 전송매체를 이용하여 영리목적의 광고성 정보를 전송하는 경우 다음 각 호의 어느 하나에 해당하는 조치를 하지 않습니다.</p><ol><li><p>광고성 정보 수신자의 수신거부 또는 수신동의의 철회를 회피·방해하는 조치</p></li><li><p>숫자·부호 또는 문자를 조합하여 전화번호·전자우편주소 등 수신자의 연락처를 자동으로 만들어 내는 조치</p></li><li><p>영리목적의 광고성 정보를 전송할 목적으로 전화번호 또는 전자우편주소를 자동으로 등록하는 조치</p></li><li><p>광고성 정보 전송자의 신원이나 광고 전송 출처를 감추기 위한 각종 조치</p></li><li><p>영리목적의 광고성 정보를 전송할 목적으로 수신자를 기망하여 회신을 유도하는 각종 조치</p></li></ol></li></ol><p><br></p><p><br></p><p><strong>제17조(개인정보 조회 및 수집동의 철회)</strong></p><ol><li><p>이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 개인정보수집 동의 철회를 요청할 수 있습니다.</p></li><li><p>이용자 및 법정 대리인은 자신의 가입정보 수집 등에 대한 동의를 철회하기 위해서는 개인정보보호책임자 또는 담당자에게 서면, 전화 또는 전자우편주소로 연락하시면 회사는 지체 없이 조치하겠습니다.</p></li></ol><p><br></p><p><br></p><p><strong>제18조(개인정보 정보변경 등)</strong></p><ol><li><p>이용자는 회사에게 전조의 방법을 통해 개인정보의 오류에 대한 정정을 요청할 수 있습니다.</p></li><li><p>회사는 전항의 경우에 개인정보의 정정을 완료하기 전까지 개인정보를 이용 또는 제공하지 않으며 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.</p></li></ol><p><br></p><p><br></p><p><strong>제19조(이용자의 의무)</strong></p><ol><li><p>이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며, 이용자의 부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게 있습니다.</p></li><li><p>타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을 상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.</p></li><li><p>이용자는 전자우편주소, 비밀번호 등에 대한 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다.</p></li></ol><p><br></p><p><br></p><p><strong>제20조(회사의 개인정보 관리)</strong></p><p>회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조, 훼손 등이 되지 아니하도록 안전성을 확보하기 위하여 필요한 기술적·관리적 보호대책을 강구하고 있습니다.</p><p><br></p><p><br></p><p><strong>제21조(삭제된 정보의 처리)</strong></p><p>회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 회사가 수집하는 "개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</p><p><br></p><p><br></p><p><strong>제22조(비밀번호의 암호화)</strong></p><p>이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고 있으며, 개인정보의 확인, 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.</p><p><br></p><p><br></p><p><strong>제23조(해킹 등에 대비한 대책)</strong></p><ol><li><p>회사는 해킹, 컴퓨터 바이러스 등 정보통신망 침입에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.</p></li><li><p>회사는 최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 유출 또는 손상되지 않도록 방지하고 있습니다.</p></li><li><p>회사는 만일의 사태에 대비하여 침입차단 시스템을 이용하여 보안에 최선을 다하고 있습니다.</p></li><li><p>회사는 민감한 개인정보(를 수집 및 보유하고 있는 경우)를 암호화 통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다.</p></li></ol><p><br></p><p><br></p><p><strong>제24조(개인정보 처리 최소화 및 교육)</strong></p><p>회사는 개인정보 관련 처리 담당자를 최소한으로 제한하며, 개인정보 처리자에 대한 교육 등 관리적 조치를 통해 법령 및 내부방침 등의 준수를 강조하고 있습니다.</p><p><br></p><p><br></p><p><strong>제25조(개인정보 유출 등에 대한 조치)</strong></p><p>회사는 개인정보의 분실·도난·유출(이하 "유출 등"이라 한다) 사실을 안 때에는 지체 없이 다음 각 호의 모든 사항을 해당 이용자에게 알리고 방송통신위원회 또는 한국인터넷진흥원에 신고합니다.</p><ol><li><p>유출 등이 된 개인정보 항목</p></li><li><p>유출 등이 발생한 시점</p></li><li><p>이용자가 취할 수 있는 조치</p></li><li><p>정보통신서비스 제공자 등의 대응 조치</p></li><li><p>이용자가 상담 등을 접수할 수 있는 부서 및 연락처</p></li></ol><p><br></p><p><br></p><p><strong>제26조(개인정보 유출 등에 대한 조치의 예외)</strong></p><p>회사는 전조에도 불구하고 이용자의 연락처를 알 수 없는 등 정당한 사유가 있는 경우에는 회사의 홈페이지에 30일 이상 게시하는 방법으로 전조의 통지를 갈음하는 조치를 취할 수 있습니다.</p><p><br></p><p><br></p><p><strong>제27조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</strong></p><ol><li><p>회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 개인정보 자동 수집장치(이하 '쿠키')를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 웹브라우저(PC 및 모바일을 포함)에게 보내는 소량의 정보이며 이용자의 저장공간에 저장되기도 합니다.&nbsp;&nbsp;</p></li><li><p>이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.</p></li><li><p>다만, 쿠키의 저장을 거부할 경우에는 로그인이 필요한 회사의 일부 서비스는 이용에 어려움이 있을 수 있습니다.</p></li></ol><p><br></p><p><br></p><p><strong>제28조(쿠키 설치 허용 지정 방법)</strong></p><p>웹브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.</p><ol><li><p>Edge : 웹브라우저 우측 상단의 설정 메뉴 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제</p></li><li><p>Chrome : 웹브라우저 우측 상단의 설정 메뉴 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터</p></li><li><p>Whale : 웹브라우저 우측 상단의 설정 메뉴 &gt; 개인정보 보호 &gt; 쿠키 및 기타 사이트 데이터</p></li></ol><p><br></p><p><br></p><p><strong>제29조(회사의 개인정보 보호 책임자 지정)</strong></p><ol><li><p>회사는 이용자의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호 책임자를 지정하고 있습니다.</p><ol><li><p>개인정보 보호 책임자</p><ol><li><p>성명: 박승현</p></li><li><p>직책: 관리자</p></li><li><p>전화번호: 010-5034-8381</p></li><li><p>이메일: shpark91@kakao.com</p></li></ol></li></ol></li></ol><p><br></p><p><br></p><p><strong>제30조(권익침해에 대한 구제방법)</strong></p><ol><li><p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p><ol><li><p>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</p></li><li><p>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</p></li><li><p>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</p></li><li><p>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</p></li></ol></li><li><p>회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 제1항의 담당부서로 연락해주시기 바랍니다.</p></li><li><p>개인정보 보호법 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p><ol><li><p>중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)</p></li></ol></li></ol><p><br></p><p><strong>부칙</strong></p><p>제1조 본 방침은 2024.05.06.부터 시행됩니다.</p>`} }></div>
        }else if(props.type == 'informationUse'){
            div =  <div dangerouslySetInnerHTML={ {__html:`<p>이용안내</p><p>회원정보</p><div contenteditable="false"><hr></div><ol><li><p>회원가입 안내</p><ul><li><p>승현네는 기본적으로 회원제로 운영하고 있습니다.</p></li><li><p>회원가입비나 월회비,연회비 등 어떠한 비용도 청구하지 않는 100% 무료입니다.</p></li></ul></li></ol><p><br></p><p>주문ㆍ결제</p><div contenteditable="false"><hr></div><ol><li><p>상품 주문 방법</p><ol><li><p>상품 선택</p></li><li><p>장바구니 담기</p></li><li><p>회원 ID 로그인 또는 비회원 주문</p></li><li><p>주문서 작성</p></li><li><p>결제 방법 선택 및 결제</p></li><li><p>주문 성공화면 (주문번호) ※ 비회원 주문시 주문번호를 꼭 메모해주세요.</p></li></ol></li><li><p>결제 방법</p><ul><li><p>승현네는 신용카드,카카오페이를 통한 결제방법을 제공하고있습니다.</p></li><li><p>신용카드 결제 : 보안 걱정 없는 KG이니시스 전자 결제를 이용, 이용 내역서는 (주)케이지이니시스로 표기됩니다.</p></li></ul></li></ol><p><br></p><p>배송</p><div contenteditable="false"><hr></div><ol><li><p>배송 기간 및 배송 방법</p><ul><li><p>승현네는 로젠택배와 우체국 택배를 이용하고 있으며, 배송 관련 사항들은 택배사 원칙에 따라 운영되고 있습니다.</p></li></ul></li><li><p>주문확인 및 배송조회</p><ul><li><p>승현네 공식 홈페이지에서 주문시 주문내역 페이지를 통해 주문확인이 가능합니다.</p></li><li><p>배송조회는 로젠택배와 우체국택배의 사이트에서 송장번호를 이용해 추적 가능합니다.</p></li></ul></li></ol><p><br></p><p>취소ㆍ교환ㆍ반품</p><div contenteditable="false"><hr></div><ol><li><p>주문취소</p><ul><li><p>주문취소는 배송전 상태에서는 직접 취소가 가능합니다.</p></li><li><p>배송 후 주문취소는 고객센터를 통해 요청 바랍니다.</p></li><li><p>카드로 결제하신 경우,매입 전 취소는 카드사에서 당일날 취소처리가 이루어지거나, 매입 후 취소일 경우 은행영업일 기준으로 3~5일 소요되어 카드사에서 취소됩니다.</p></li></ul></li><li><p>교환/반품</p><ul><li><p>과채류는 단순 변심에 의한 반품이나 환불은 불가 합니다.</p></li><li><p>상품수령 후 결함/불량이 발생된 경우 [박스 겉면 운송장 사진1장, 제품사진 1장이상]을 미리 찍어 확보해 고객센터로 연락을 주세요.</p></li><li><p>상품 배송중에 생기는 파손은 부득이한 경우가 아닌 이상 환불과 교환이 불가능 합니다.</p></li></ul></li></ol>`} }></div>
        }

        return (
            <div>
            {div}
            </div>
        )
}
export default TermsOfUse