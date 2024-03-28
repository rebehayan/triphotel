import React from "react";
import Heading from "./Heading";
import "../styles/components/memberRule.css";

const ReservationRule = () => {
  return (
    <>
      <Heading
        tag={"h2"}
        text={"개인정보 이용약관"}
        className={"sm text-center pb-5 whitespace-nowrap mobile:min-w-80 tablet:min-w-[50rem]"}
      />
      <ul className="overflow-auto max-h-[40rem] member-rule mobile:text-sm tablet:text-base">
        <li>
          1.1 트립호텔 플랫폼을 이용하는 데 필요한 정보. 당사는 회원님이 트립호텔 플랫폼을 이용할 때 회원님의 개인정보를
          수집합니다. 그렇지 않은 경우, 트립호텔은 요청하신 서비스를 회원님께 제공하지 못할 수 있습니다. 이러한 정보에는
          다음이 포함됩니다.
          <ul>
            <li>
              1.1.1 연락처, 계정 및 프로필 정보. 회원님의 이름, 전화번호, 우편 주소, 이메일 주소, 생년월일, 프로필 사진
              등. 이러한 정보 중 일부는 회원님이 사용하는 기능에 따라 수집 여부가 달라질 수 있습니다.
            </li>
            <li>
              1.1.2 본인 인증 정보. 적절한 경우, 당사는 신분증 인증 시 (관련 법률에 따라) 정부 발급 신분증의 이미지,
              기타 인증 정보 및/또는 셀카 사진을 요청할 수 있습니다. 회원님의 신분증 사본이 제출되는 경우, 당사는
              신분증에서 정보를 가져옵니다. 본인 인증에 대한 자세한 내용은 도움말 센터에서 확인하세요.
            </li>
            <li>
              1.1.3 결제 정보. 결제 계좌 또는 은행 계좌 정보 등. 트립호텔 사용자가 아닌 경우, 트립호텔은 사용자와 관련된
              결제 정보를 받을 수 있습니다. 예를 들면, 트립호텔 사용자가 예약을 완료하기 위해 본인의 결제 카드를
              제공하는 경우가 있습니다. 다른 사람을 대신한 결제 및 대금 수령과 관련한 도움말 센터 게시글을 참조하세요.
            </li>
          </ul>
        </li>
        <li>
          1.2 회원님이 트립호텔에 자발적으로 제공하는 정보. 회원님은 다음과 같은 추가적인 개인정보를 트립호텔에
          자발적으로 제공할 수 있습니다.
          <ul>
            <li>1.2.1 추가적인 프로필 정보. 성별, 선호하는 언어, 도시, 인적 사항 등.</li>

            <li>
              1.2.2 다른 사람에 대한 정보. 다른 사람 소유의 결제 수단이나 연락처 정보, 또는 동반 일행에 대한 정보.
              타인에 대한 개인정보를 제공함으로써, 회원님은 본 개인정보 처리방침에 명시된 목적을 위해 해당 정보를
              트립호텔에 제공할 권한이 있음을 확인하고, 해당 타인에게 트립호텔 개인정보 처리방침을 공유했음을
              확인합니다.
            </li>
            <li>
              1.2.3 생체정보. 사용자가 인증을 위해 사진 및 신분증 서류를 제출한 경우, 사진 및 서류에서 추출된 안면 인식
              데이터(관련 법률에서 요구하는 경우 사용자 동의를 얻은 후 수집).
            </li>
            <li>
              1.2.4 기타 정보. 예를 들어, 양식을 작성하거나, 계정에 정보를 추가하거나, 설문조사에 응답하거나, 커뮤니티
              포럼에 게시글을 올리거나, 프로모션에 참여하거나, 트립호텔 고객지원 팀 및 다른 회원들과 소통하거나, 주소록
              연락처 가져오기를 실행 또는 수동으로 입력하거나, 회원님의 주소 및/또는 위치를 제공하거나, 본인의 경험을
              당사와 공유하는 경우. 여기에는 회원님이 당사에 자발적으로 공유하는 건강 정보도 포함될 수 있습니다.
            </li>
          </ul>
        </li>
        <li>
          1.3 트립호텔 플랫폼 및 당사 결제 서비스 사용 시 자동으로 수집되는 정보. 당사는 회원님이 트립호텔 플랫폼 및
          결제 서비스를 이용할 때 개인정보를 자동 수집합니다. 이러한 정보에는 다음이 포함될 수 있습니다.
          <ul>
            <li>
              1.3.1 위치 정보. 회원님 기기의 설정에 따라 IP 주소, 모바일 기기나 기타 기기의 GPS 또는 회원님이 당사에
              제공한 기타 정보를 이용해 판단하는 정확하거나 대략적인 위치 등. 설정이나 기기 사용 권한을 통해 해당 기능을
              활성화하는 경우, 트립호텔은 회원님이 앱을 사용하지 않는 동안에도 이 정보를 수집할 수 있습니다.
            </li>
            <li>
              1.3.2 사용 정보. 리스팅 검색, 회원님이 진행한 예약, 추가한 부가 서비스, 접속 날짜 및 시간, 트립호텔 플랫폼
              사용 이전 또는 이후에 조회하거나 이용한 페이지, 조회하거나 클릭하는 페이지나 콘텐츠, 제3자
              애플리케이션으로 연결되는 링크 등 트립호텔 플랫폼에서 수행하는 기타 행위 등. 트립호텔 계정을 만들지
              않았거나 로그인하지 않은 경우에도 당사는 이러한 정보를 수집할 수 있습니다.
            </li>
            <li>
              1.3.3 기기 정보. IP 주소, 하드웨어 및 소프트웨어 정보, 기기 정보, 기기 이벤트 정보, 고유 식별자, 충돌
              데이터, 메시지 확인 여부 등. 트립호텔 계정을 만들지 않았거나 로그인하지 않은 경우에도 당사는 이러한 정보를
              수집할 수 있습니다.
            </li>
            <li>1.3.4 쿠키 정책에 설명된 쿠키 및 유사 기술.</li>
            <li>
              1.3.5 결제 거래 정보. 사용된 결제 수단, 결제 날짜 및 시간, 결제 금액, 결제 수단 만료일, 청구지 우편번호,
              페이팔 이메일 주소, IBAN 정보, 회원님의 주소, 기타 거래 관련 세부 정보 등.
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default ReservationRule;
