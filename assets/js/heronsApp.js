$(document).ready(function() {
   
    const players = 
    [
        {
            name : "ramsden",
            pos: "cm",
            value: "87",
            pac: "89",
            sho:"84",
            pas:"83",
            dri:"85",
            def:"79",
            phy:"82",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        },
        {
            name: "gibbons"
        }
    ];

    let playerSelected = players[Math.floor(Math.random() * players.length)];

    const infoHTML = 
    
    `<div id="card-top">
			
        <div class="info">
            <div class="value">88</div>
            <div class="position">cam</div>
            <div class="country"><div></div></div>
            <div class="club"><div></div></div>				
        </div>
        
        <div class="image" style= "background-image: url(${playerSelected.headshot})"></div>
        <div class="backfont">FUT21</div>
    </div>
    <div id="card-bottom">
        <div class="name">${playerSelected.name}</div>
        <div class="stats">
            <div>
                <ul>
                    <li><span>89</span><span>pac</span></li>
                    <li><span>87</span><span>sho</span></li>
                    <li><span>91</span><span>pas</span></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><span>90</span><span>dri</span></li>
                    <li><span>23</span><span>def</span></li>
                    <li><span>81</span><span>phy</span></li>
                </ul>
            </div>
        </div>
    </div>`;
    
    
    $('#card-inner').html(infoHTML);


    // Open Pack
    $(document).on("click","a",function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('#card').addClass('active');
    });

        // Close Pack
    $(document).on("click","#card.active",function(e) {
            e.preventDefault();
            $(this).removeClass('active');
            $('a').removeClass('active');
    });

});