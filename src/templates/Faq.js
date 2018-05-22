import React from 'react';

export const Faq = () => (
    <div>

        <div className="wrapper style1">
        <div className="inner">
       

       <section className="container box feature1">
        <header className="first major">
         <div className="row">
            <div className="12u">
                <h2>Frequently Asked Questions</h2>
            </div>
         </div>
        </header>


            {/* Content */}

                    <h3 className="major">What is Ethereum?</h3>
                    <p><a href="https://www.ethereum.org/" target="_blank">Ethereum</a> is a decentralised platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.
										These apps run on a custom built blockchain, an enormously powerful shared global infrastructure that can move value around and represent the ownership of property.</p>

                    <h3 className="major">What is the TLS-N protocol?</h3>
                    <p><a href="https://tls-n.org/" target="_blank">TLS-N</a>, developed by a team of researchers at ETH Zurich, generates non-interactive proofs about the content of a TLS session that can be verified directly by smart contracts.
									This protocol is the first TLS extension that provides a secure, standardised non-repudiation mechanism. In essence, this allows anybody to become an 'oracle' service. It does this by making important additions to the existing secure TLS protocol.</p>


                    <h3 className="major">How do I get a flight insurance?</h3>
                    <p> You can create an insurance on your next flight, so in case it is canceled you can get a refund through this website. Please check the "Create Insurance" tab.
                    After filling in all required details it will display you a list of available flights. Please select your flight, the sum you would like to get covered and the premium you are ready to pay.
                    As long as you have metamask installed and ether on the Rinkeby test network, you will be able to submit this request. Next, you will need to wait until someone would like to accept your insurance request</p>

                    <h3 className="major">How can I invest to an insurance request?</h3>
                    <p> Metamask needs to be enabled and you should have some etherether on the Rinkeby test network. Please click on invest tab and choose an available flight insurance request.
                     In order to get ether on the Rinkeby network we would suggest following the guidlines outlined <a href="https://faucet.rinkeby.io/" target="_blank">here</a>.</p>

                    <h3 className="major">How do I install Metamask?</h3>
                    <p>You can install Metamask from this address: <a href="https://metamask.io" target="_blank">metamask.io</a>. You then need to click
                        “Add to Chrome” to install MetaMask as Google Chrome extension. You then need to click “Add Extension” to confirm and MetaMask will be added.
									You can see that MetaMask is added by the little fox logo that shows up on the top right corner.</p>
       
            </section>

            </div>
            </div>

    

    </div>
);