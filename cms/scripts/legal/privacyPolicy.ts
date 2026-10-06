import { h2, link, p, ul } from '../portableText'

const email = link('biuro@rezydencjazawoja.pl', 'mailto:biuro@rezydencjazawoja.pl')
const phone = link('+48 500 290 390', 'tel:+48500290390')
const uodo = link('uodo.gov.pl', 'https://uodo.gov.pl')

export const privacyPolicy = {
  title: {
    de: 'Datenschutzerklärung',
    en: 'Privacy policy',
    pl: 'Polityka prywatności',
  },
  pl: [
    h2('1. Administrator danych'),
    p(
      'Administratorem danych osobowych jest TURAM Agata Małecka-Bargiel, ul. Słoneczna 54, 30-199 Rząska, NIP 9451750587, prowadząca obiekt Rezydencja Zawoja (Zawoja 2853, 34-222 Zawoja). W sprawach dotyczących danych osobowych prosimy o kontakt pod adresem ',
      email,
      ' lub telefonicznie: ',
      phone,
      '.'
    ),
    h2('2. Jakie dane przetwarzamy, w jakim celu i na jakiej podstawie'),
    p(
      'Przetwarzamy dane przekazane nam w formularzu zapytania na stronie, w wiadomości e-mail lub telefonicznie. Formularz zbiera imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), planowany termin pobytu, liczbę gości oraz treść wiadomości. Dane przetwarzamy w celu:'
    ),
    ul(
      [
        'odpowiedzi na zapytanie i podjęcia działań przed zawarciem umowy najmu, na żądanie osoby, której dane dotyczą (art. 6 ust. 1 lit. b RODO),',
      ],
      ['zawarcia i wykonania umowy najmu, w tym rozliczenia depozytu (art. 6 ust. 1 lit. b RODO),'],
      [
        'wypełnienia obowiązków prawnych, w szczególności księgowych i podatkowych (art. 6 ust. 1 lit. c RODO),',
      ],
      [
        'ochrony formularza przed nadużyciami oraz ustalenia, dochodzenia lub obrony roszczeń, co stanowi nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).',
      ]
    ),
    p(
      'Podanie danych jest dobrowolne, ale bez nich nie możemy odpowiedzieć na zapytanie ani zawrzeć umowy najmu.'
    ),
    h2('3. Jak działa formularz zapytania'),
    p(
      'Dane z formularza nie są zapisywane na stronie internetowej ani w żadnej bazie danych. Po wysłaniu formularza trafiają wiadomością e-mail na adres biuro@rezydencjazawoja.pl, a na podany adres e-mail wysyłamy automatyczne potwierdzenie otrzymania zapytania. Potwierdzenie nie zawiera treści wiadomości ani innych danych wpisanych w formularzu poza terminem i liczbą gości.'
    ),
    p(
      'Aby chronić formularz przed nadużyciami, ograniczamy liczbę zgłoszeń wysyłanych z jednego adresu IP w krótkim czasie. Adres IP jest przy tym przetwarzany wyłącznie technicznie przez dostawcę hostingu strony.'
    ),
    h2('4. Odbiorcy danych'),
    p(
      'Dane przekazujemy wyłącznie w zakresie niezbędnym do realizacji opisanych celów podmiotom, które wspierają nas w prowadzeniu działalności:'
    ),
    ul(
      ['Resend – dostawcy usługi wysyłki wiadomości e-mail z formularza,'],
      ['Vercel Inc. – dostawcy hostingu strony internetowej,'],
      ['dostawcy naszej poczty elektronicznej,'],
      [
        'biuru rachunkowemu, kancelarii prawnej, ubezpieczycielowi i dostawcom usług IT – gdy jest to niezbędne.',
      ]
    ),
    p(
      'Resend i Vercel mają siedziby w Stanach Zjednoczonych. Przekazanie danych poza Europejski Obszar Gospodarczy odbywa się na podstawie decyzji Komisji Europejskiej w sprawie ram ochrony danych UE–USA (EU–US Data Privacy Framework) lub standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.'
    ),
    h2('5. Jak długo przechowujemy dane'),
    ul(
      ['zapytania, które nie zakończyły się rezerwacją – do 12 miesięcy od ostatniego kontaktu,'],
      [
        'dane związane z rezerwacją i pobytem – przez czas trwania umowy, a następnie do upływu okresu przedawnienia roszczeń,',
      ],
      [
        'dokumenty księgowe – przez okres wymagany przepisami podatkowymi, co do zasady 5 lat od końca roku podatkowego.',
      ]
    ),
    h2('6. Prawa osób, których dane dotyczą'),
    p('Każdej osobie, której dane przetwarzamy, przysługuje prawo do:'),
    ul(
      ['dostępu do swoich danych i otrzymania ich kopii,'],
      ['sprostowania danych,'],
      ['usunięcia danych,'],
      ['ograniczenia przetwarzania,'],
      ['przenoszenia danych,'],
      ['wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.']
    ),
    p(
      'Aby skorzystać z tych praw, prosimy o kontakt pod adresem ',
      email,
      '. Przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, ',
      uodo,
      ').'
    ),
    h2('7. Pliki cookies'),
    p(
      'Strona zapisuje w przeglądarce tylko jeden plik cookie, lng, który zapamiętuje wybrany język. Jest on niezbędny do działania strony, dlatego nie wymaga zgody. Nie używamy plików cookies analitycznych, marketingowych ani reklamowych, a strona nie korzysta z narzędzi śledzących.'
    ),
    h2('8. Linki do innych serwisów'),
    p(
      'Mapa na stronie Kontakt jest statycznym obrazem. Kliknięcie w nią otwiera serwis Google Maps, do którego stosuje się polityka prywatności Google.'
    ),
    h2('9. Zmiany polityki prywatności'),
    p(
      'Polityka prywatności może być aktualizowana, na przykład w związku ze zmianą przepisów lub działania strony. Aktualna wersja jest zawsze dostępna na tej stronie, a data ostatniej aktualizacji znajduje się na górze.'
    ),
  ],
  en: [
    h2('1. Data controller'),
    p(
      'The controller of personal data is TURAM Agata Małecka-Bargiel, ul. Słoneczna 54, 30-199 Rząska, Poland, tax ID (NIP) 9451750587, which runs Rezydencja Zawoja (Zawoja 2853, 34-222 Zawoja). For any matter concerning personal data, please contact us at ',
      email,
      ' or by phone on ',
      phone,
      '.'
    ),
    h2('2. What data we process, why and on what basis'),
    p(
      'We process the data you give us through the inquiry form on this website, by email or by phone. The form collects your full name, email address, phone number (optional), planned dates, number of guests and your message. We process this data to:'
    ),
    ul(
      [
        'answer your inquiry and take steps at your request before a rental contract is concluded (Art. 6(1)(b) GDPR),',
      ],
      [
        'conclude and perform the rental contract, including settling the security deposit (Art. 6(1)(b) GDPR),',
      ],
      [
        'meet our legal obligations, in particular accounting and tax obligations (Art. 6(1)(c) GDPR),',
      ],
      [
        'protect the form against abuse and establish, exercise or defend legal claims, which is our legitimate interest (Art. 6(1)(f) GDPR).',
      ]
    ),
    p(
      'Providing your data is voluntary, but without it we cannot answer your inquiry or conclude a rental contract.'
    ),
    h2('3. How the inquiry form works'),
    p(
      'Data from the form is not stored on the website or in any database. When you send the form, it is delivered by email to biuro@rezydencjazawoja.pl, and we send an automatic confirmation to the email address you entered. The confirmation contains only your dates and the number of guests, not your message or the other details you entered.'
    ),
    p(
      'To protect the form against abuse, we limit the number of submissions from a single IP address within a short time. Your IP address is processed for this purely technically by our hosting provider.'
    ),
    h2('4. Recipients of data'),
    p(
      'We share data only to the extent necessary for the purposes above, with companies that help us run our business:'
    ),
    ul(
      ['Resend – provider of the email delivery service for the form,'],
      ['Vercel Inc. – provider of website hosting,'],
      ['our email provider,'],
      ['an accounting office, law firm, insurer and IT service providers – when necessary.']
    ),
    p(
      'Resend and Vercel are based in the United States. Data is transferred outside the European Economic Area on the basis of the European Commission decision on the EU–US Data Privacy Framework or standard contractual clauses approved by the European Commission.'
    ),
    h2('5. How long we keep data'),
    ul(
      ['inquiries that do not lead to a booking – up to 12 months after the last contact,'],
      [
        'booking and stay data – for the duration of the contract, then until legal claims become time-barred,',
      ],
      [
        'accounting documents – for the period required by tax law, generally 5 years from the end of the tax year.',
      ]
    ),
    h2('6. Your rights'),
    p('Everyone whose data we process has the right to:'),
    ul(
      ['access their data and receive a copy,'],
      ['have their data corrected,'],
      ['have their data erased,'],
      ['restrict processing,'],
      ['data portability,'],
      ['object to processing based on our legitimate interest.']
    ),
    p(
      'To exercise these rights, contact us at ',
      email,
      '. You also have the right to lodge a complaint with the President of the Polish Personal Data Protection Office (ul. Stawki 2, 00-193 Warszawa, ',
      uodo,
      ').'
    ),
    h2('7. Cookies'),
    p(
      'This website stores only one cookie in your browser, lng, which remembers your chosen language. It is strictly necessary for the website to work, so it does not require consent. We do not use analytics, marketing or advertising cookies, and the website uses no tracking tools.'
    ),
    h2('8. Links to other services'),
    p(
      'The map on the Contact page is a static image. Clicking it opens Google Maps, which is covered by the Google privacy policy.'
    ),
    h2('9. Changes to this policy'),
    p(
      'This privacy policy may be updated, for example when the law or the way the website works changes. The current version is always available on this page, and the date of the last update is shown at the top.'
    ),
  ],
  de: [
    h2('1. Verantwortlicher'),
    p(
      'Verantwortlich für die Verarbeitung personenbezogener Daten ist TURAM Agata Małecka-Bargiel, ul. Słoneczna 54, 30-199 Rząska, Polen, Steuernummer (NIP) 9451750587, Betreiberin der Rezydencja Zawoja (Zawoja 2853, 34-222 Zawoja). Bei Fragen zum Datenschutz erreichen Sie uns unter ',
      email,
      ' oder telefonisch unter ',
      phone,
      '.'
    ),
    h2('2. Welche Daten wir verarbeiten, zu welchem Zweck und auf welcher Grundlage'),
    p(
      'Wir verarbeiten die Daten, die Sie uns über das Anfrageformular auf dieser Website, per E-Mail oder telefonisch übermitteln. Das Formular erfasst Ihren Vor- und Nachnamen, Ihre E-Mail-Adresse, Ihre Telefonnummer (optional), den geplanten Zeitraum, die Anzahl der Gäste und Ihre Nachricht. Wir verarbeiten diese Daten, um:'
    ),
    ul(
      [
        'Ihre Anfrage zu beantworten und auf Ihren Wunsch Maßnahmen vor Abschluss eines Mietvertrags zu ergreifen (Art. 6 Abs. 1 lit. b DSGVO),',
      ],
      [
        'den Mietvertrag abzuschließen und zu erfüllen, einschließlich der Abrechnung der Kaution (Art. 6 Abs. 1 lit. b DSGVO),',
      ],
      [
        'unsere gesetzlichen Pflichten zu erfüllen, insbesondere Buchhaltungs- und Steuerpflichten (Art. 6 Abs. 1 lit. c DSGVO),',
      ],
      [
        'das Formular vor Missbrauch zu schützen und Rechtsansprüche festzustellen, geltend zu machen oder abzuwehren, was unser berechtigtes Interesse ist (Art. 6 Abs. 1 lit. f DSGVO).',
      ]
    ),
    p(
      'Die Angabe Ihrer Daten ist freiwillig, ohne sie können wir Ihre Anfrage jedoch nicht beantworten und keinen Mietvertrag abschließen.'
    ),
    h2('3. So funktioniert das Anfrageformular'),
    p(
      'Die Daten aus dem Formular werden weder auf der Website noch in einer Datenbank gespeichert. Nach dem Absenden werden sie per E-Mail an biuro@rezydencjazawoja.pl übermittelt, und wir senden eine automatische Bestätigung an die von Ihnen angegebene E-Mail-Adresse. Die Bestätigung enthält nur den Zeitraum und die Anzahl der Gäste, nicht Ihre Nachricht oder die übrigen Angaben.'
    ),
    p(
      'Um das Formular vor Missbrauch zu schützen, begrenzen wir die Anzahl der Anfragen von einer IP-Adresse innerhalb kurzer Zeit. Ihre IP-Adresse wird dabei ausschließlich technisch von unserem Hosting-Anbieter verarbeitet.'
    ),
    h2('4. Empfänger der Daten'),
    p(
      'Wir geben Daten nur im für die genannten Zwecke erforderlichen Umfang an Unternehmen weiter, die uns bei unserer Tätigkeit unterstützen:'
    ),
    ul(
      ['Resend – Anbieter des E-Mail-Versands für das Formular,'],
      ['Vercel Inc. – Anbieter des Website-Hostings,'],
      ['unseren E-Mail-Anbieter,'],
      [
        'ein Steuerbüro, eine Anwaltskanzlei, eine Versicherung und IT-Dienstleister – soweit erforderlich.',
      ]
    ),
    p(
      'Resend und Vercel haben ihren Sitz in den Vereinigten Staaten. Die Übermittlung von Daten außerhalb des Europäischen Wirtschaftsraums erfolgt auf Grundlage des Angemessenheitsbeschlusses der Europäischen Kommission zum EU-US Data Privacy Framework oder von Standardvertragsklauseln der Europäischen Kommission.'
    ),
    h2('5. Wie lange wir Daten speichern'),
    ul(
      ['Anfragen, die nicht zu einer Buchung führen – bis zu 12 Monate nach dem letzten Kontakt,'],
      [
        'Buchungs- und Aufenthaltsdaten – für die Dauer des Vertrags und danach bis zur Verjährung möglicher Ansprüche,',
      ],
      [
        'Buchhaltungsunterlagen – für die gesetzlich vorgeschriebene Dauer, in der Regel 5 Jahre ab Ende des Steuerjahres.',
      ]
    ),
    h2('6. Ihre Rechte'),
    p('Jede Person, deren Daten wir verarbeiten, hat das Recht auf:'),
    ul(
      ['Auskunft über ihre Daten und eine Kopie davon,'],
      ['Berichtigung der Daten,'],
      ['Löschung der Daten,'],
      ['Einschränkung der Verarbeitung,'],
      ['Datenübertragbarkeit,'],
      ['Widerspruch gegen eine Verarbeitung auf Grundlage unseres berechtigten Interesses.']
    ),
    p(
      'Um diese Rechte auszuüben, schreiben Sie uns an ',
      email,
      '. Sie haben außerdem das Recht, sich beim Präsidenten des polnischen Amtes für den Schutz personenbezogener Daten zu beschweren (ul. Stawki 2, 00-193 Warszawa, ',
      uodo,
      ').'
    ),
    h2('7. Cookies'),
    p(
      'Diese Website speichert nur ein Cookie in Ihrem Browser, lng, das die gewählte Sprache speichert. Es ist für den Betrieb der Website unbedingt erforderlich und bedarf daher keiner Einwilligung. Wir verwenden keine Analyse-, Marketing- oder Werbe-Cookies, und die Website nutzt keine Tracking-Tools.'
    ),
    h2('8. Links zu anderen Diensten'),
    p(
      'Die Karte auf der Kontaktseite ist ein statisches Bild. Ein Klick darauf öffnet Google Maps, für das die Datenschutzerklärung von Google gilt.'
    ),
    h2('9. Änderungen dieser Erklärung'),
    p(
      'Diese Datenschutzerklärung kann aktualisiert werden, zum Beispiel bei Änderungen der Rechtslage oder der Funktionsweise der Website. Die aktuelle Fassung ist immer auf dieser Seite verfügbar, das Datum der letzten Aktualisierung steht oben.'
    ),
  ],
}
