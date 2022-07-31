import Breadcrumbs, {
  BreadcrumbsProps,
} from "components/Breadcrumbs/Breadcrumbs";
import React, { useEffect, useState } from "react";
import SectionLayout from "components/SectionLayout/SectionLayout";
import styles from "styles/PageTemplate.module.scss";

const dummyBreadcrumbs: BreadcrumbsProps[] = [
  { text: "Home", path: "/home" },
  { text: "User", path: "/user" },
  { text: "Terms & Conditions", path: "/terms-conditions" },
];

const TermsConditionsPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>(
    [] as BreadcrumbsProps[]
  );

  useEffect(() => {
    setBreadcrumbs(dummyBreadcrumbs);
  }, [breadcrumbs]);

  return (
    <div className={styles.terms_conditions}>
      <SectionLayout>
        <Breadcrumbs data={breadcrumbs} />
        <h1 className={styles.title}>Term & Conditions</h1>
        <div className={styles.content}>
          <br />{" "}
          <h2 className="underline font-bold">
            PRIVACY POLICY & PDPA COMPLIANCE STATEMENT
          </h2>
          <p>
            Thank you for visiting our web site and/or using our mobile
            application. This is the Privacy Policy & PDPA Compliance Statement
            (“Privacy Policy”) of <strong>HELLO TRAVEL PTE. LTD.</strong> (UEN
            201536273E) (<strong>“the Company”</strong> or <strong>“We”</strong>{" "}
            and details of which can be found at the end of this Policy). For
            the avoidance of doubt, the Privacy Policy includes without
            limitation the usage of our properties including but not limited to
            the URL www.havehalalwilltravel.com, any of our associated
            newsletter and mobile application (regardless of its form)
            (collectively referred to as <strong>“our Properties”</strong> ) and
            your participation in any of our events. The Privacy Policy tells
            you how we use personal information collected at this site or in
            relation to any of our Properties. Please read the Privacy Policy
            before using our Properties or submitting any personal information.
            By using our Properties, you are accepting the practices described
            in the Privacy Policy, which are incorporated into the General Terms
            of Use. These practices may be changed, but any changes will be
            posted and changes will only apply to activities and information
            going forward, not on a retroactive basis. You are encouraged to
            review the Privacy Policy whenever you visit the site to make sure
            that you understand how any personal information you provide will be
            used.
          </p>
          <br /> <h2 className="font-bold">Policy</h2>
          <p>
            We are committed to protecting the privacy and accuracy of your
            personally identifiable information to a reasonable extent possible,
            subject to provisions of the law. Other than as required by laws
            that guarantee public access to certain types of information, or in
            response to subpoenas or other legal instruments that authorize
            disclosure, personally identifiable information is not disclosed
            without your express consent. For avoidance of doubt, the use of the
            Properties shall constitute your express consent.
          </p>
          <br /> <h2 className="font-bold">Compliance with the Law</h2>
          <p>
            We are committed to ensuring compliance with the applicable privacy
            laws, in particular the Personal Data Protection Act 2012 (No. 26 of
            2012). You can find a copy of the Act at http://statutes.agc.gov.sg.
          </p>
          <br />{" "}
          <h2 className="font-bold">Personal Data Protection Act Statement</h2>
          <p>
            The main purposes for which your personal data is collected, used or
            disclosed by us, its related entities and our service providers in
            Singapore include providing you with information relating to our
            latest news and updates including but not limited to commercial and
            technology updates, events, promotions and third party tie-ups and
            partnerships. More specifically, we use your personal data for the
            following purposes:
          </p>
          <ol>
            <li>
              Electronic direct mail (either by us or a commercial third party);
            </li>
            <li>Planning and execution of any event marketing campaigns;</li>
            <li>Marketing updates on any events organized by us.</li>
          </ol>
          <p>
            In addition, if you have registered your telephone number with the
            national Do Not Call (DNC) registry, we will not send you
            promotional and marketing messages via your telephone number unless
            you have provided us consent to do so.
          </p>
          <p>
            The Privacy Policy provides more information about how we collect,
            use and disclose your personal data. Should you have any feedback or
            enquiries relating to your personal data or if you wish to stop
            receiving promotional or marketing messages from us, please contact
            our
          </p>
          <p>Personal Data Protection Officer at the following addresses:</p>
          <p>Name: Melvin Goh</p>
          <p>Email: hello@havehalalwilltravel.com</p>
          <p>Postal Address: 721 North Bridge Road, 721A, Singapore 198689</p>
          <p>Telephone Number: +65 6909 0008</p>
          <p>Company details: Hello Travel Pte. Ltd. (UEN 201536273E)</p>
          <p>
            For more information about PDPA generally, please visit the Personal
            Data Protection Commission’s Properties at http://www.pdpc.gov.sg.
          </p>
          <br /> <h2 className="font-bold">Information Collection and Use</h2>
          <p>
            Categories of personally identifiable information collected by us
            include all details submitted through the Properties or at our
            events. The submission of such information through us shall mean
            that consent has been given under Sections 13, 14 and/or 15 of the
            Personal Data Protection Act 2012. The secondary purpose is for us
            to serve you the most relevant advertisements according to your
            profile and needs.
          </p>
          <p>
            We and/or our commercial partners may use your personally
            identifiable information to contact you for the purposes of
            marketing and customer service support.{" "}
          </p>
          <p>
            {" "}
            All information and documents transmitted via us will be protected
            and secured in the most reasonable and secure method available.
          </p>
          <p>
            Additionally, the Web server hosting this service collects, at least
            temporarily, the following information: Internet Protocol (IP)
            address of device being used; Web pages requested; referring Web
            page; browser used; date and time. This information is collected to
            monitor the use for our own use. We may use IP-address and device
            information and anonymous-browser history to report information
            about site accesses and for profiling purposes. This information is
            generally used to improve our application presentation and
            utilization. We also may use IP address information for
            troubleshooting purposes.
          </p>
          <br />{" "}
          <h2 className="font-bold">
            Use of Non-Personally Identifiable Information (“Non PII”)
          </h2>
          <p>
            We may use your Non PII to personalize content and make suggestions
            for you by using the said information to understand how you use and
            interact with the Properties and/or the things you’re connected to
            and interested in on and off the Properties. When we have location
            information, we use it to tailor our Properties and the content
            therein for you.
          </p>
          <p>We may use your information for communication purposes such as:</p>
          <ol>
            <li>Sending you marketing communications;</li>
            <li>Communicating with you about our Properties;</li>
            <li>
              Keeping you informed about our policies and/or terms and any
              changes therein; and
            </li>
            <li>Responding to you when you contact us.</li>
          </ol>
          <p>We may use the information we have about you to:</p>
          <ol>
            <li>Improve our advertising and measurement systems;</li>
            <li>Show you relevant advertisements on and off the Properties;</li>
            <li>
              Measure the effectiveness and reach of advertisements and services
              [HHWT to confirm].
            </li>
          </ol>
          <br />{" "}
          <h2 className="font-bold underline">
            Sharing of Non-Personally Identifiable Information
          </h2>
          <p>
            We do not share personally identifiable information such as your
            name, address and/or contact number with our advertising,
            measurement or analytic partners (“Our Partners”) without your prior
            consent. We may share the Non PII we have about you with our third
            party partners in order to optimize the relevance of the
            advertisements that are shown to you. We may also provide Our
            Partners with information about the reach and effectiveness of their
            advertising without providing information that personally identifies
            you. When you use the Property or third party apps, websites and/or
            other services that are integrated with our Properties, Our Partners
            may receive information about your posts and/or shares and/or
            searches (without any personally identifiable information) in order
            for the advertisements to be customized to suit your interests.
          </p>
          <p>
            We share and/or transfer Non PII to our vendors, service providers
            and other partners globally who support us such as by providing us
            technical infrastructure services, analysing how the Properties are
            used, measuring the effectiveness of advertisements and services,
            providing customer service, facilitating payments or conducting
            academic research and surveys (which may be published).
          </p>
          <br />{" "}
          <h2 className="font-bold">
            Use of Non-Personally Identifiable Information (“Non PII”)
          </h2>
          <p>
            Other than as set out in this policy, we will not disclose or share,
            without your express consent, personally identifiable information,
            except for certain explicit circumstances in which disclosure may be
            required by law. Your personally identifiable information will not
            be distributed or sold to third-party organizations.
          </p>
          <br />{" "}
          <h2 className="font-bold">Links to Other Sites or Applications</h2>
          <p>
            You may encounter links to other Web sites or applications of
            organizations not directly affiliated with us. Please be aware that
            we are not responsible for the information practices of external
            organizations. We recommend you review the privacy statements of
            each external Web site or application that collects personal
            information.
          </p>
          <br /> <h2 className="font-bold">Cookie/Tracking Technology</h2>
          <p>
            We may use cookie and tracking technology depending on the features
            offered. Cookie and tracking technology are useful for gathering
            information such as browser type and operating system, tracking the
            number of visitors to the Site, and understanding how visitors use
            us. Cookies can also help customize us for visitors. Personal
            information cannot be collected via cookies and other tracking
            technology, however, if you previously provided personally
            identifiable information, cookies may be tied to such information.
            Aggregate cookie and tracking information may be shared with third
            parties.
          </p>
          <br /> <h2 className="font-bold">Distribution of Information</h2>
          <p>
            We may share information with governmental agencies or other
            companies assisting us in fraud prevention or investigation. We may
            do so when:
          </p>
          <ol>
            <li>permitted or required by law;</li>
            <li>
              trying to protect against or prevent actual or potential fraud or
              unauthorized transactions; and/or
            </li>
            <li>
              investigating fraud which has already taken place. The information
              is not provided to these companies for marketing purposes.
            </li>
          </ol>
          <p>
            We may transfer your personal information to third parties in
            locations around the world for the purposes described in the Privacy
            Policy. Wherever your personal information is transferred, stored or
            processed by us, we will take reasonable steps to safeguard the
            privacy of your personal information.
          </p>
          <br /> <h2 className="font-bold">Data Security, Retention etc.</h2>
          <p>
            The security, integrity and confidentiality of your information are
            extremely important to us. We have implemented technical,
            administrative and physical security measures that are designed to
            protect guest information from unauthorized access, disclosure, use
            and modification. From time to time, we review our security
            procedures to consider appropriate new technology and methods.
            Please be aware though that, despite our best efforts, no security
            measures are perfect or impenetrable. We will retain your personal
            information for the length of time needed to fulfil the purposes
            outlined in the Privacy Policy unless a longer retention period is
            required or permitted by law.
          </p>
          <br /> <h2 className="font-bold">Changes to Policy</h2>
          <p>
            From time to time, we may change the Privacy Policy to accommodate
            new technologies, industry practices, regulatory requirements or for
            other purposes. We will provide notice to you if these changes are
            material and, where required by applicable law, we will obtain your
            consent.
          </p>
          <br />{" "}
          <h2 className="font-bold">Contact / Enquiry / Data Amendment</h2>
          <p>
            If you have any concerns, issues or questions regarding the Privacy
            Policy, please feel free to contact us via email at
            hello@havehalalwilltravel.com.
          </p>
          <p>
            If you would like to access your personal data that is retained by
            us or amend any personal data, please feel free to contact us via
            email at hello@havehalalwilltravel.com.
          </p>
        </div>
      </SectionLayout>
    </div>
  );
};

export default TermsConditionsPage;
