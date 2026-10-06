import { h2, link, nested, ol, p } from '../portableText'

const email = link('biuro@rezydencjazawoja.pl', 'mailto:biuro@rezydencjazawoja.pl')
const phone = link('+48 500 290 390', 'tel:+48500290390')

export const rentalTerms = {
  title: {
    de: 'Mietbedingungen',
    en: 'Rental terms',
    pl: 'Regulamin najmu',
  },
  pl: [
    p(
      'Prosimy o zapoznanie się z regulaminem przed rezerwacją: pozwala on uniknąć nieporozumień i zapewnić wszystkim Gościom komfortowy i bezpieczny wypoczynek. W przypadku grup wynajmujących cały dom regulamin akceptuje osoba dokonująca rezerwacji i płatności za pobyt (dalej: Najemca). Najemca odpowiada za całą grupę oraz za szkody wyrządzone umyślnie lub przypadkowo w czasie pobytu. Dokonując rezerwacji w Rezydencji Zawoja, Najemca oświadcza, że zapoznał się z regulaminem i akceptuje jego warunki.'
    ),
    h2('1. Rezerwacja'),
    ol(
      [
        'Rezerwacji można dokonać telefonicznie pod numerem ',
        phone,
        ', mailowo na adres ',
        email,
        ' lub przez formularz zapytania na stronie rezydencjazawoja.pl.',
      ],
      [
        'Rezerwację uważa się za dokonaną po wpłacie przez Najemcę zaliczki w wymaganej wysokości i terminie. Szczegółowe warunki Najemca otrzymuje mailowo w odpowiedzi na zapytanie.',
      ],
      ['Wpłata zaliczki oznacza akceptację niniejszego regulaminu.'],
      [
        'Po wpłacie zaliczki Wynajmujący przesyła Najemcy potwierdzenie rezerwacji, a Najemca odsyła na adres mailowy Wynajmującego podpisaną Umowę Najmu.',
      ],
      [
        'Brak wpłaty w wymaganym terminie powoduje automatyczne anulowanie rezerwacji, bez dodatkowego powiadomienia ze strony Wynajmującego.',
      ],
      [
        'Najemca może odstąpić od Umowy Najmu w formie pisemnej, wysyłając informację na adres ',
        email,
        '.',
      ],
      [
        'Wpłacona kwota jest zwracana na rachunek, z którego wpłynęła, w ciągu 3 dni od otrzymania pisemnej dyspozycji, po potrąceniu kosztów anulacji (kary umownej):',
      ],
      nested(
        ['bez kosztów – przy anulacji na 45 dni lub więcej przed rozpoczęciem pobytu,'],
        ['50% wartości rezerwacji – przy anulacji na 44 do 31 dni przed rozpoczęciem pobytu,'],
        ['100% wartości rezerwacji – przy anulacji na 30 dni lub krócej przed rozpoczęciem pobytu.']
      ),
      ['Wartością rezerwacji, od której liczone są kary umowne, jest kwota podana w Umowie Najmu.']
    ),
    h2('2. Przyjazd i wyjazd'),
    ol(
      [
        'Doba zaczyna się o godzinie 16:00 w dniu przyjazdu i kończy o godzinie 10:00 w dniu wyjazdu. W szczególnych przypadkach, za potwierdzoną zgodą Wynajmującego, można ustalić inne godziny zameldowania i wymeldowania.',
      ],
      [
        'Przy zameldowaniu wymagany jest dowód osobisty Najemcy. W dniu przyjazdu Najemca przekazuje imienną listę osób, które będą zakwaterowane w Rezydencji i za które odpowiada (maksymalnie 10 osób, łącznie z dziećmi).',
      ],
      [
        'Osoby niezakwaterowane mogą przebywać w Rezydencji wyłącznie po wcześniejszym uzgodnieniu z Wynajmującym. W przeciwnym razie naliczana jest dodatkowa opłata 200 zł za osobę za każdy dzień.',
      ],
      [
        'Najemca może korzystać z domu wyłącznie w celach mieszkaniowo-wypoczynkowych i nie może go podnajmować bez zgody Wynajmującego.',
      ],
      [
        'W dniu przyjazdu Najemca otrzymuje klucze do domu i zwraca je Wynajmującemu w dniu wyjazdu. Za zgubienie lub niepozostawienie kluczy pobierana jest opłata 200 zł.',
      ],
      [
        'Przy przekazaniu kluczy osoba wprowadzająca wyjaśnia obsługę kominka i wybranych urządzeń elektrycznych. W tym momencie Najemca zapoznaje się także ze stanem technicznym i wyposażeniem domu.',
      ],
      [
        'Jeśli przy wprowadzeniu Najemca nie zgłosi uwag co do stanu technicznego, przyjmuje się, że dom został przekazany w stanie niebudzącym zastrzeżeń.',
      ]
    ),
    h2('3. Zakres najmu i ceny'),
    ol(
      ['Aktualne ceny znajdują się w cenniku na stronie rezydencjazawoja.pl.'],
      [
        'Cena najmu jest ceną brutto i obejmuje cały dom na wyłączność, media, pościel i ręczniki oraz dostęp do sauny, groty solnej, pokoju bilardowego i gier, sali fitness i całej infrastruktury obiektu.',
      ],
      [
        'Zewnętrzna gorąca bania jest płatna dodatkowo na miejscu, zgodnie z cennikiem na stronie. Zimą bania może być nieczynna z powodu mrozów i oblodzenia.',
      ],
      [
        'Najpóźniej 3 dni przed przyjazdem Najemca wpłaca przelewem na rachunek Wynajmującego depozyt zwrotny w wysokości 1200 zł na pokrycie ewentualnych szkód powstałych z winy Najemcy. Depozyt jest zwracany na rachunek, z którego wpłynął, w ciągu 3 dni od dnia wyjazdu. Wpłata depozytu lub jej brak nie zwalnia Najemcy z obowiązku pokrycia szkód w pełnej wysokości.',
      ],
      ['Wynajmujący nie odpowiada za utratę lub uszkodzenie rzeczy wniesionych przez Najemcę.']
    ),
    h2('4. Obowiązki Najemcy'),
    ol(
      [
        'Najemca dba o zasady dobrego sąsiedztwa i utrzymuje dom w niepogorszonym stanie. Szkody wyrządzone w czasie pobytu, w tym trwałe zabrudzenia, uszkodzenia lub zaginięcie wyposażenia, Najemca niezwłocznie zgłasza Wynajmującemu. Ich równowartość i koszty usunięcia pokrywa Najemca.',
      ],
      ['Obowiązuje całkowity zakaz urządzania hucznych imprez na zewnątrz.'],
      ['Cisza nocna trwa od godziny 22:00 do 7:00.'],
      [
        'Osoby z zewnątrz mogą przebywać na terenie obiektu wyłącznie za zgodą Wynajmującego i nie dłużej niż do godziny 21:00.',
      ],
      [
        'Pobyt zwierząt wymaga zgody Wynajmującego (mailowo lub SMS-em). Najemca sprząta po swoich zwierzętach. Za pobyt zwierzęcia bez zgody naliczana jest opłata 200 zł za zwierzę.',
      ],
      ['W Rezydencji obowiązuje bezwzględny zakaz palenia tytoniu, z wyjątkiem ogrodu i tarasu.'],
      [
        'Kominek wewnątrz domu jest udostępniany bezpłatnie. Ze względu na zagrożenie pożarowe Najemca stale kontroluje wielkość płomienia i nigdy nie pozostawia ognia bez opieki. Ognia nie wolno gasić wodą.',
      ],
      [
        'Ze względów przeciwpożarowych nie wolno używać urządzeń elektrycznych ani gazowych, które nie są wyposażeniem domu i mogą stwarzać zagrożenie pożarowe (np. grzałek, grzejników, palników gazowych), ani wnosić materiałów łatwopalnych i wybuchowych.',
      ],
      [
        'Nie wolno przesuwać mebli, sprzętu RTV i sportowego (np. głośników, bieżni), programować dekodera ani ustawiać anteny. Jeśli przywrócenie ustawień będzie wymagało wizyty technika, koszt jego pracy pokrywa Najemca.',
      ],
      [
        'Wychodząc z domu, należy sprawdzić, czy wszystkie okna są zamknięte, a drzwi wejściowe zamknięte na klucz.',
      ],
      ['Obowiązuje segregacja odpadów: oznaczone kosze i worki są dostępne na terenie obiektu.']
    ),
    h2('5. Postanowienia końcowe'),
    ol(
      [
        'Wynajmujący może w czasie pobytu wykonywać prace serwisowe, porządkowe i niezbędne naprawy, ale wyłącznie za wiedzą Najemcy, chyba że zachodzi zagrożenie dla życia lub mienia.',
      ],
      [
        'Prawem właściwym dla sporów między Wynajmującym a Najemcą jest prawo polskie. Spory rozstrzygane są polubownie, a w razie braku porozumienia przez sąd właściwy dla miejsca prowadzenia działalności Wynajmującego. W sprawach nieuregulowanych regulaminem stosuje się przepisy Kodeksu cywilnego.',
      ],
      ['Dla bezpieczeństwa Gości obiekt jest monitorowany.']
    ),
    p(
      'Prosimy o dbanie o dom, wyłączanie zbędnego oświetlenia, zakręcanie wody i pozostawienie domu w takim stanie, w jakim go Państwo zastali. Dziękujemy i życzymy udanego pobytu!'
    ),
  ],
  en: [
    p(
      'Please read these terms before booking: they help avoid misunderstandings and make every stay comfortable and safe. When a group rents the whole house, the terms are accepted by the person who makes the booking and pays for the stay (the Guest). The Guest is responsible for the whole group and for any damage caused, deliberately or by accident, during the stay. By booking Rezydencja Zawoja, the Guest confirms that they have read and accept these terms.'
    ),
    h2('1. Booking'),
    ol(
      [
        'You can book by phone on ',
        phone,
        ', by email at ',
        email,
        ' or through the inquiry form at rezydencjazawoja.pl.',
      ],
      [
        'A booking is made once the Guest pays the advance in the required amount and by the required date. The Guest receives the detailed conditions by email in reply to their inquiry.',
      ],
      ['Paying the advance means accepting these terms.'],
      [
        'Once the advance is paid, the Owner sends the Guest a booking confirmation, and the Guest returns the signed Rental Agreement to the Owner by email.',
      ],
      [
        'If payment is not made on time, the booking is cancelled automatically, without further notice from the Owner.',
      ],
      ['The Guest may withdraw from the Rental Agreement in writing by emailing ', email, '.'],
      [
        'The amount paid is refunded to the account it came from within 3 days of receiving the written request, minus the cancellation charge (contractual penalty):',
      ],
      nested(
        ['free of charge – if cancelled 45 days or more before the stay,'],
        ['50% of the booking value – if cancelled 44 to 31 days before the stay,'],
        ['100% of the booking value – if cancelled 30 days or less before the stay.']
      ),
      [
        'The booking value used to calculate these charges is the amount stated in the Rental Agreement.',
      ]
    ),
    h2('2. Arrival and departure'),
    ol(
      [
        'The stay begins at 16:00 on the day of arrival and ends at 10:00 on the day of departure. In special cases, other check-in and check-out times can be agreed with the Owner’s confirmed consent.',
      ],
      [
        'The Guest’s ID card or passport is required at check-in. On arrival, the Guest provides a list of the names of everyone staying in the house, for whom the Guest is responsible (up to 10 people, including children).',
      ],
      [
        'People not staying in the house may only be there by prior arrangement with the Owner. Otherwise, an additional charge of PLN 200 per person per day applies.',
      ],
      [
        'The Guest may use the house for residential and holiday purposes only and may not sublet it without the Owner’s consent.',
      ],
      [
        'On arrival, the Guest receives the house keys and returns them to the Owner on departure. A charge of PLN 200 applies if the keys are lost or not returned.',
      ],
      [
        'When handing over the keys, the person welcoming the Guest explains how to use the fireplace and selected electrical appliances. At this point the Guest also checks the condition and equipment of the house.',
      ],
      [
        'If the Guest raises no concerns about the condition of the house at check-in, the house is deemed to have been handed over in good order.',
      ]
    ),
    h2('3. What is included and prices'),
    ol(
      ['Current prices are listed on the price list at rezydencjazawoja.pl.'],
      [
        'The rental price includes VAT and covers exclusive use of the whole house, utilities, bed linen and towels, and access to the sauna, salt cave, billiard and games room, fitness room and all the facilities of the property.',
      ],
      [
        'The outdoor hot tub is paid separately on site, according to the price list on the website. In winter it may be closed due to frost and ice.',
      ],
      [
        'No later than 3 days before arrival, the Guest pays a refundable security deposit of PLN 1,200 by bank transfer to cover any damage caused by the Guest. The deposit is returned to the account it came from within 3 days of departure. Paying or not paying the deposit does not release the Guest from covering damage in full.',
      ],
      ['The Owner is not liable for the loss of or damage to the Guest’s belongings.']
    ),
    h2('4. Guest obligations'),
    ol(
      [
        'The Guest respects the neighbours and keeps the house in the condition in which it was received. Any damage caused during the stay, including permanent stains, damage to or loss of equipment, must be reported to the Owner immediately. The Guest covers its value and the cost of repair.',
      ],
      ['Loud outdoor parties are strictly forbidden.'],
      ['Quiet hours are from 22:00 to 7:00.'],
      ['Visitors may be on the property only with the Owner’s consent and no later than 21:00.'],
      [
        'Pets require the Owner’s consent (by email or text message). The Guest cleans up after their pets. A charge of PLN 200 per animal applies to pets brought without consent.',
      ],
      [
        'Smoking is strictly forbidden inside the house; it is allowed only in the garden and on the terrace.',
      ],
      [
        'The indoor fireplace is available free of charge. Because of the fire risk, the Guest keeps the size of the flame under control at all times and never leaves the fire unattended. Never put the fire out with water.',
      ],
      [
        'For fire safety, do not use electrical or gas appliances that are not part of the house’s equipment and may cause a fire hazard (such as immersion heaters, heaters or gas burners), and do not bring flammable or explosive materials.',
      ],
      [
        'Do not move furniture, audio-visual or sports equipment (such as speakers or the treadmill), reprogram the TV decoder or adjust the antenna. If a technician is needed to restore the settings, the Guest pays for their work.',
      ],
      [
        'Whenever you leave the house, please check that all windows are closed and the front door is locked.',
      ],
      ['Waste must be sorted: labelled bins and bags are available on the property.']
    ),
    h2('5. Final provisions'),
    ol(
      [
        'During the stay, the Owner may carry out maintenance, cleaning and necessary repairs, but only with the Guest’s knowledge, unless there is a threat to life or property.',
      ],
      [
        'Disputes between the Owner and the Guest are governed by Polish law. They are settled amicably or, failing agreement, by the court competent for the Owner’s place of business. Matters not covered by these terms are governed by the Polish Civil Code.',
      ],
      ['For our guests’ safety, the property is under video surveillance.']
    ),
    p(
      'Please look after the house, switch off unnecessary lights, turn off the taps and leave the house as you found it. Thank you, and enjoy your stay!'
    ),
  ],
  de: [
    p(
      'Bitte lesen Sie diese Bedingungen vor der Buchung: Sie helfen, Missverständnisse zu vermeiden, und sorgen für einen angenehmen und sicheren Aufenthalt. Mietet eine Gruppe das ganze Haus, akzeptiert die Person, die bucht und den Aufenthalt bezahlt (der Mieter), diese Bedingungen. Der Mieter ist für die gesamte Gruppe verantwortlich und haftet für Schäden, die während des Aufenthalts vorsätzlich oder versehentlich verursacht werden. Mit der Buchung der Rezydencja Zawoja bestätigt der Mieter, dass er diese Bedingungen gelesen hat und akzeptiert.'
    ),
    h2('1. Buchung'),
    ol(
      [
        'Sie können telefonisch unter ',
        phone,
        ', per E-Mail an ',
        email,
        ' oder über das Anfrageformular auf rezydencjazawoja.pl buchen.',
      ],
      [
        'Die Buchung gilt als erfolgt, sobald der Mieter die Anzahlung in der geforderten Höhe und fristgerecht geleistet hat. Die genauen Bedingungen erhält der Mieter per E-Mail als Antwort auf seine Anfrage.',
      ],
      ['Mit der Zahlung der Anzahlung akzeptiert der Mieter diese Bedingungen.'],
      [
        'Nach Eingang der Anzahlung sendet der Vermieter eine Buchungsbestätigung, und der Mieter schickt den unterschriebenen Mietvertrag per E-Mail an den Vermieter zurück.',
      ],
      [
        'Erfolgt die Zahlung nicht fristgerecht, wird die Buchung automatisch storniert, ohne weitere Benachrichtigung durch den Vermieter.',
      ],
      ['Der Mieter kann vom Mietvertrag schriftlich per E-Mail an ', email, ' zurücktreten.'],
      [
        'Der gezahlte Betrag wird innerhalb von 3 Tagen nach Eingang der schriftlichen Erklärung auf das Konto zurückerstattet, von dem er stammt, abzüglich der Stornogebühr (Vertragsstrafe):',
      ],
      nested(
        ['kostenlos – bei Stornierung 45 Tage oder mehr vor Beginn des Aufenthalts,'],
        ['50 % des Buchungswerts – bei Stornierung 44 bis 31 Tage vor Beginn des Aufenthalts,'],
        [
          '100 % des Buchungswerts – bei Stornierung 30 Tage oder weniger vor Beginn des Aufenthalts.',
        ]
      ),
      ['Grundlage für die Berechnung dieser Gebühren ist der im Mietvertrag angegebene Betrag.']
    ),
    h2('2. Anreise und Abreise'),
    ol(
      [
        'Der Aufenthalt beginnt am Anreisetag um 16:00 Uhr und endet am Abreisetag um 10:00 Uhr. In besonderen Fällen können mit bestätigter Zustimmung des Vermieters andere Zeiten vereinbart werden.',
      ],
      [
        'Beim Check-in ist der Personalausweis oder Reisepass des Mieters erforderlich. Am Anreisetag übergibt der Mieter eine Namensliste aller Personen, die im Haus übernachten und für die er verantwortlich ist (höchstens 10 Personen einschließlich Kinder).',
      ],
      [
        'Personen, die nicht im Haus übernachten, dürfen sich dort nur nach vorheriger Absprache mit dem Vermieter aufhalten. Andernfalls wird eine zusätzliche Gebühr von 200 PLN pro Person und Tag berechnet.',
      ],
      [
        'Der Mieter darf das Haus nur zu Wohn- und Erholungszwecken nutzen und es ohne Zustimmung des Vermieters nicht untervermieten.',
      ],
      [
        'Am Anreisetag erhält der Mieter die Hausschlüssel und gibt sie am Abreisetag an den Vermieter zurück. Bei Verlust oder Nichtrückgabe der Schlüssel wird eine Gebühr von 200 PLN berechnet.',
      ],
      [
        'Bei der Schlüsselübergabe erklärt die einweisende Person die Bedienung des Kamins und ausgewählter Elektrogeräte. Dabei prüft der Mieter auch den Zustand und die Ausstattung des Hauses.',
      ],
      [
        'Meldet der Mieter bei der Übergabe keine Mängel, gilt das Haus als in einwandfreiem Zustand übergeben.',
      ]
    ),
    h2('3. Leistungen und Preise'),
    ol(
      ['Die aktuellen Preise finden Sie in der Preisliste auf rezydencjazawoja.pl.'],
      [
        'Der Mietpreis ist ein Bruttopreis und umfasst die exklusive Nutzung des ganzen Hauses, Nebenkosten, Bettwäsche und Handtücher sowie den Zugang zu Sauna, Salzgrotte, Billard- und Spielzimmer, Fitnessraum und allen Einrichtungen des Anwesens.',
      ],
      [
        'Der Hot Tub im Freien wird vor Ort gemäß der Preisliste auf der Website separat bezahlt. Im Winter kann er wegen Frost und Glätte geschlossen sein.',
      ],
      [
        'Spätestens 3 Tage vor der Anreise überweist der Mieter eine rückzahlbare Kaution von 1.200 PLN auf das Konto des Vermieters, zur Deckung von Schäden, die der Mieter verursacht. Die Kaution wird innerhalb von 3 Tagen nach der Abreise auf das Konto zurücküberwiesen, von dem sie stammt. Die Zahlung oder Nichtzahlung der Kaution befreit den Mieter nicht von der vollen Haftung für Schäden.',
      ],
      ['Der Vermieter haftet nicht für Verlust oder Beschädigung von Sachen des Mieters.']
    ),
    h2('4. Pflichten des Mieters'),
    ol(
      [
        'Der Mieter achtet auf gute Nachbarschaft und hält das Haus in dem Zustand, in dem er es übernommen hat. Schäden während des Aufenthalts, einschließlich dauerhafter Verschmutzungen, Beschädigung oder Verlust von Ausstattung, meldet der Mieter unverzüglich dem Vermieter. Deren Wert und die Kosten der Beseitigung trägt der Mieter.',
      ],
      ['Laute Feiern im Freien sind streng verboten.'],
      ['Die Nachtruhe gilt von 22:00 bis 7:00 Uhr.'],
      [
        'Besucher dürfen sich nur mit Zustimmung des Vermieters und nicht länger als bis 21:00 Uhr auf dem Grundstück aufhalten.',
      ],
      [
        'Haustiere erfordern die Zustimmung des Vermieters (per E-Mail oder SMS). Der Mieter entfernt die Hinterlassenschaften seiner Tiere. Für Tiere ohne Zustimmung wird eine Gebühr von 200 PLN pro Tier berechnet.',
      ],
      [
        'Im Haus herrscht striktes Rauchverbot; Rauchen ist nur im Garten und auf der Terrasse erlaubt.',
      ],
      [
        'Der Kamin im Haus steht kostenlos zur Verfügung. Wegen der Brandgefahr kontrolliert der Mieter ständig die Größe der Flamme und lässt das Feuer nie unbeaufsichtigt. Das Feuer darf nicht mit Wasser gelöscht werden.',
      ],
      [
        'Aus Brandschutzgründen dürfen keine Elektro- oder Gasgeräte benutzt werden, die nicht zur Ausstattung des Hauses gehören und eine Brandgefahr darstellen können (z. B. Tauchsieder, Heizgeräte, Gasbrenner), und es dürfen keine brennbaren oder explosiven Stoffe mitgebracht werden.',
      ],
      [
        'Möbel, Unterhaltungselektronik und Sportgeräte (z. B. Lautsprecher, Laufband) dürfen nicht verstellt, der Decoder nicht umprogrammiert und die Antenne nicht verstellt werden. Ist ein Techniker nötig, um die Einstellungen wiederherzustellen, trägt der Mieter die Kosten.',
      ],
      [
        'Bitte prüfen Sie beim Verlassen des Hauses, ob alle Fenster geschlossen und die Haustür abgeschlossen ist.',
      ],
      [
        'Der Müll ist zu trennen: Gekennzeichnete Behälter und Säcke stehen auf dem Grundstück bereit.',
      ]
    ),
    h2('5. Schlussbestimmungen'),
    ol(
      [
        'Der Vermieter darf während des Aufenthalts Wartungs-, Reinigungs- und notwendige Reparaturarbeiten durchführen, jedoch nur mit Wissen des Mieters, außer bei Gefahr für Leben oder Eigentum.',
      ],
      [
        'Für Streitigkeiten zwischen Vermieter und Mieter gilt polnisches Recht. Sie werden gütlich beigelegt, andernfalls vom Gericht am Sitz der Geschäftstätigkeit des Vermieters entschieden. In allen hier nicht geregelten Fragen gilt das polnische Zivilgesetzbuch.',
      ],
      ['Zur Sicherheit unserer Gäste wird das Anwesen videoüberwacht.']
    ),
    p(
      'Bitte gehen Sie sorgsam mit dem Haus um, schalten Sie unnötiges Licht aus, drehen Sie das Wasser ab und hinterlassen Sie das Haus so, wie Sie es vorgefunden haben. Vielen Dank und einen schönen Aufenthalt!'
    ),
  ],
}
