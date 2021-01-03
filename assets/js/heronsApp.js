$(document).ready(function() {
   
    const players = 
    [
        {
            name : "ramsden",
            pos: "cm",
            value: "87",
            pac: "89",
            sho:"85",
            pas:"86",
            dri:"85",
            def:"79",
            phy:"84",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        },
        {
            name: "gibbons",
            pos: "st",
            value: "88",
            pac: "88",
            sho:"91",
            pas:"84",
            dri:"85",
            def:"30",
            phy:"75",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        }, 
        {
            name: "spratt",
            pos: "cam",
            value: "88",
            pac: "88",
            sho:"88",
            pas:"91",
            dri:"89",
            def:"23",
            phy:"74",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        },
        {
            name: "fraser",
            pos: "rw",
            value: "86",
            pac: "87",
            sho:"85",
            pas:"84",
            dri:"82",
            def:"80",
            phy:"74",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        },
        {
            name: "hyrycz",
            pos: "cb",
            value: "89",
            pac: "85",
            sho:"78",
            pas:"85",
            dri:"80",
            def:"93",
            phy:"89",
            headshot:"/images/herons/64E0AE42-B159-4ECC-80BB-022FC7C30738.png"
        }
    ];

    let playerSelected = players[Math.floor(Math.random() * players.length)];

    const infoHTML = 
    
    `<div id="card-top">
			
        <div class="info">
            <div class="value">${playerSelected.value}</div>
            <div class="position">${playerSelected.pos}</div>
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
                    <li><span>${playerSelected.pac}</span><span>pac</span></li>
                    <li><span>${playerSelected.sho}</span><span>sho</span></li>
                    <li><span>${playerSelected.pas}</span><span>pas</span></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><span>${playerSelected.dri}</span><span>dri</span></li>
                    <li><span>${playerSelected.def}</span><span>def</span></li>
                    <li><span>${playerSelected.phy}</span><span>phy</span></li>
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