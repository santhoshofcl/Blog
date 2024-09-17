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
