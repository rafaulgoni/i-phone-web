const loadPhone = async (searchText ='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    
    displayPhone(phones, isShowAll)
}


const displayPhone = (phones, isShowAll) => {
    phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = "";

    const showAll = document.getElementById('showBtn')
    if (phones.length > 10 && !isShowAll) {
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    
    if (!isShowAll) {
        phones = phones.slice(0,10);
    }
    

    phones.forEach( phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-auto bg-gray-100 shadow-xl text-center`;
        phoneCard.innerHTML= `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title font-bold">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <p class="text-black font-bold">Price: 99$</p>
                <div class="card-actions justify-end">
                <button onclick ="handleShowDetails('${phone.slug}')" class="btn bg-white text-black">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoading(false)
}

const handleShowDetails = async (id) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDelails(phone)
}

const showPhoneDelails = (phone) => {
    console.log(phone);
    my_modal_5.showModal();

    const detailsPhone = document.getElementById('show-phone-details')
    detailsPhone.innerHTML=`
    <img class="text-center" src ="${phone.image}" alt="" />
    <h1 class="text-2xl font-bold text-black">${phone.name}</h1>
    <P>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</P>
    <P><samp class="font-bold text-black">Storage:</samp>${phone?.mainFeatures?.storage}</P>
    <P><samp class="font-bold text-black">Brand:</samp>${phone?.brand}</P>
    <P><samp class="font-bold text-black">Memory:</samp>${phone?.mainFeatures?.memory}</P>
    <P><samp class="font-bold text-black">GPS:</samp>${phone?.others?.GPS}</P>
    <P><samp class="font-bold text-black">DisplaySize:</samp>${phone?.mainFeatures?.displaySize}</P>
    <P><samp class="font-bold text-black">Bluetooth:</samp>${phone?.others?.Bluetooth}</P>
    <P><samp class="font-bold text-black">ChipSet:</samp>${phone?.mainFeatures?.chipSet}</P>
    `
}


const handleSearch = (isShowAll) =>{
    toggleLoading(true);
    const searchInput = document.getElementById('search-input')
    const searchText = searchInput.value;
    loadPhone(searchText, isShowAll);
}

const toggleLoading = (isLoading) =>{
    const loadingInfinit = document.getElementById('loading-infinit');
    if (isLoading) {
        loadingInfinit.classList.remove('hidden');
    }else{
        loadingInfinit.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}
loadPhone()