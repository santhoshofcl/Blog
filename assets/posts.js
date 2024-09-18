$(document).ready(function() {
    // Read More button functionality
    $(".read-more").click(function(e) {
        e.preventDefault();

        const post = $(this).closest(".post");
        const postId = post.data("id");

        // Collapse previously expanded content
        $(".post").not(post).find("p.additional-content").remove();
        $(".post").not(post).find(".read-more").text("Read More");

        let content;
        if (postId === 1) {
            content = `<p class="additional-content">2. Voice Search Optimization<br>
As more users search via voice (through devices like Google Assistant, Siri, etc.), optimizing blogs for voice search is becoming crucial. This means more conversational and direct answers within content to match how people ask questions aloud.
<br>3. Interactive Content<br>
Quizzes, polls, calculators, and interactive sliders are becoming popular in blog design. Interactive content helps engage readers and improves user experience, leading to longer on-site time and higher conversion rates.
<br>4. Progressive Web Apps (PWA)<br>
PWAs provide a seamless experience on mobile by combining the features of a native app and a traditional website. Bloggers are adopting this technology to improve speed, offline access, and user engagement, enhancing the overall experience.
<br>5. Blockchain for Content Monetization<br>
Blockchain technology is being explored as a new way to protect content from plagiarism and as a mechanism for decentralized content monetization through NFTs or cryptocurrencies, allowing bloggers to retain ownership and control over their work.</p>`;
        } else if (postId === 2) {
            content = `<p class="additional-content">2. Confucianism<br>
Economic Influence: Confucianism emphasizes education, respect for authority, social harmony, and hard work. These values are credited with driving economic development in East Asian countries like China, South Korea, Japan, and Taiwan.
Impact: East Asian economies have experienced rapid industrialization and economic growth, often referred to as the "East Asian Miracle."
<br>3. Islamic Economics<br>
Economic Influence: Islamic economic principles encourage fairness, charity (Zakat), and ethical trade, while prohibiting practices like usury (interest on loans). There’s a growing interest in Islamic finance, which operates according to Shariah law, promoting risk-sharing rather than interest-based banking.
Impact: Islamic banking is a rapidly growing sector, with significant market share in countries like the UAE, Saudi Arabia, and Malaysia.
<br>4. Buddhism<br>
Economic Influence: Buddhism advocates for moderation, non-attachment to material goods, and ethical behavior in economic activities. "Engaged Buddhism" encourages economic development that minimizes harm to others and the environment.
Impact: In countries like Bhutan, the concept of “Gross National Happiness” is rooted in Buddhist values and seeks a balance between economic development and spiritual well-being.
<br>5. Hinduism (Dharmic Economics)<br>
Economic Influence: Hinduism emphasizes Dharma (righteous living) and the pursuit of Artha (economic prosperity) in a balanced way. Ethical trade, respect for resources, and charity are key principles in Dharmic economics.
Impact: India’s mixed economy, which balances tradition with modern capitalism, draws inspiration from these values, alongside globalization and innovation.</p>`;
        }else if (postId === 3) {
            content = `<p class="additional-content">பதவிகள் :<br>

Non-Technical Popular Categories (NTPC) i.e. Chief Commercial – Ticket Supervisor, Station Master, Goods Train Manager, Junior Account Assistant – Typist, Senior Clerk – Typist, Commercial – Ticket Clerk, Accounts Clerk – Typist, Junior Clerk – Typist & Trains Clerk Postselse if (postId === 3) {
            content = `<p class="additional-content"><br>பதவிகள் :<br>

Non-Technical Popular Categories (NTPC) i.e. Chief Commercial – Ticket Supervisor, Station Master, Goods Train Manager, Junior Account Assistant – Typist, Senior Clerk – Typist, Commercial – Ticket Clerk, Accounts Clerk – Typist, Junior Clerk – Typist & Trains Clerk Posts<br>

<br>காலிப்பணியிடங்கள்  :<br>

          <br>11558 பணியிடம் காலியாக உள்ளது.<br>

<br>கல்வி தகுதி :<br>


<br>1. Chief Commercial – Ticket Supervisor – Any Degree<br>
<br>2. Station Master – Any Degree<br>
<br>3. Goods Train Manager – Any Degree<br>
<br>4. Junior Account Assistant – Typist – Any Degree with Typing proficiency in English or Hindi on Computer is essential<br>
<br>5. Senior Clerk – Typist – Any Degree with Typing proficiency in English or Hindi on Computer is essential<br>
<br>6. Commercial – Ticket Clerk – 12th (+2 Stage) or its Equivalent<br>
<br>7. Accounts Clerk – Typist – 12th (+2 Stage) or its Equivalent<br>
<br>8. Junior Clerk – Typist – 12th (+2 Stage) or its Equivalent<br>
<br>9. Trains Clerk – 12th (+2 Stage) or its Equivalent<br>

<br>வயது வரம்பு :<br>


<br>1. Chief Commercial – Ticket Supervisor – 18 to 36 Years<br>
<br>2. Station Master – 18 to 36 Years<br>
<br>3. Goods Train Manager – 18 to 36 Years<br>
<br>4. Junior Account Assistant – Typist – 18 to 36 Years<br>
<br>5. Senior Clerk – Typist – 18 to 36 Years<br>
<br>6. Commercial – Ticket Clerk – 18 to 33 Years<br>
<br>7. Accounts Clerk – Typist – 18 to 33 Years<br>
<br>8. Junior Clerk – Typist – 18 to 33 Years<br>
<br>9. Trains Clerk – 18 to 33 Years<br>
<br>சம்பள விவரம் :<br>

<br>1. Chief Commercial – Ticket Supervisor – Level 6 Rs.35400/-<br>
<br>2. Station Master – Level 6 Rs.35400/-<br>
<br>3. Goods Train Manager – Level 5 Rs.29200/-<br>
<br>4. Junior Account Assistant – Typist – Level 5 Rs.29200/-<br>
<br>5. Senior Clerk – Typist – Level 5 Rs.29200/-<br>
<br>6. Commercial – Ticket Clerk – Level – 3 Rs.21700/-<br>
<br>7. Accounts Clerk – Typist – Level – 3 Rs.19900/-<br>
<br>8. Junior Clerk – Typist – Level – 3 Rs.19900/-<br>
<br>9. Trains Clerk – Level – 3 Rs.19900/-<br>
<br>தேர்வு செய்யும் முறை:<br>

<br>1. 1st Stage Computer Based Test (CBT)<br>
<br>2. 2nd Stage Computer Based Test (CBT), Typing Skill Test/Computer Based Aptitude Test (as applicable) and Document Verification/Medical Examination<br>
<br>விண்ணப்பிக்கும் முறை :<br>

Eligible and interested candidates are required to visit RRB NTPC website (https://www.rrbchennai.gov.in/) and submit the application online. Online Registration shall commence at 14.09.2024 and will close at 13.10.2024<br>
<br>NOTIFICATION : <a href="https://drive.google.com/file/d/1Rzo46P4U1pG026PrPIEKVzC2aJAcz_i8/view?usp=drivesdk" download="RRB-NTPC-Short-Notice.pdf">CLICK HERE</a><br>
<br> WEBSITE : <a href="https://www.rrbchennai.gov.in/" target="_blank">CLICKHERE </a></p>`;
        }<br>

<br>காலிப்பணியிடங்கள்  :<br>

          11558 பணியிடம் காலியாக உள்ளது.

<br>கல்வி தகுதி :<br>


<br>1. Chief Commercial – Ticket Supervisor – Any Degree<br>
<br>2. Station Master – Any Degree<br>
<br>3. Goods Train Manager – Any Degree<br>
<br>4. Junior Account Assistant – Typist – Any Degree with Typing proficiency in English or Hindi on Computer is essential<br>
<br>5. Senior Clerk – Typist – Any Degree with Typing proficiency in English or Hindi on Computer is essential<br>
<br>6. Commercial – Ticket Clerk – 12th (+2 Stage) or its Equivalent<br>
<br>7. Accounts Clerk – Typist – 12th (+2 Stage) or its Equivalent<br>
<br>8. Junior Clerk – Typist – 12th (+2 Stage) or its Equivalent<br>
<br>9. Trains Clerk – 12th (+2 Stage) or its Equivalent<br>

<br>வயது வரம்பு :<br>


<br>1. Chief Commercial – Ticket Supervisor – 18 to 36 Years<br>
<br>2. Station Master – 18 to 36 Years<br>
<br>3. Goods Train Manager – 18 to 36 Years<br>
<br>4. Junior Account Assistant – Typist – 18 to 36 Years<br>
<br>5. Senior Clerk – Typist – 18 to 36 Years<br>
<br>6. Commercial – Ticket Clerk – 18 to 33 Years<br>
<br>7. Accounts Clerk – Typist – 18 to 33 Years<br>
<br>8. Junior Clerk – Typist – 18 to 33 Years<br>
<br>9. Trains Clerk – 18 to 33 Years<br>
<br>சம்பள விவரம் :<br>

<br>1. Chief Commercial – Ticket Supervisor – Level 6 Rs.35400/-<br>
<br>2. Station Master – Level 6 Rs.35400/-<br>
<br>3. Goods Train Manager – Level 5 Rs.29200/-<br>
<br>4. Junior Account Assistant – Typist – Level 5 Rs.29200/-<br>
<br>5. Senior Clerk – Typist – Level 5 Rs.29200/-<br>
<br>6. Commercial – Ticket Clerk – Level – 3 Rs.21700/-<br>
<br>7. Accounts Clerk – Typist – Level – 3 Rs.19900/-<br>
<br>8. Junior Clerk – Typist – Level – 3 Rs.19900/-<br>
<br>9. Trains Clerk – Level – 3 Rs.19900/-<br>
<br>தேர்வு செய்யும் முறை:<br>

<br>1. 1st Stage Computer Based Test (CBT)<br>
<br>2. 2nd Stage Computer Based Test (CBT), Typing Skill Test/Computer Based Aptitude Test (as applicable) and Document Verification/Medical Examination<br>
<br>விண்ணப்பிக்கும் முறை :<br>

Eligible and interested candidates are required to visit RRB NTPC website (https://www.rrbchennai.gov.in/) and submit the application online. Online Registration shall commence at 14.09.2024 and will close at 13.10.2024<br>
<br>NOTIFICATION : <a href="https://drive.google.com/uc?export=download&id=1Rzo46P4U1pG026PrPIEKVzC2aJAcz_i8" download="RRB-NTPC-Short-Notice.pdf">CLICK HERE</a>
<br>
<br> WEBSITE : <a href="https://www.rrbchennai.gov.in/" target="_blank">CLICKHERE </a></p>`;
        }

        const readMoreButton = $(this);
        if (readMoreButton.text() === "Read More") {
            $(this).before(content); // Insert the additional content
            readMoreButton.text("Read Less");
        } else {
            $(this).prevAll("p.additional-content").remove(); // Remove the additional content
            readMoreButton.text("Read More");
        }
    });
});
