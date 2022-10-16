
export default class Base {

    static visit(path = "") {
        cy.visit(path);
    }

    static reloadPage() {
        cy.reload();
    }

    static explicitWait(seconds = 2000){
        cy.wait(seconds)
    }

    static implicitWait(method = "GET", endpoint = "", alias='loadPageFirst', status_esperado = 200){
        cy.intercept({
            method: method,
            url: endpoint,
        }).as(alias);

        const waitPolling = (res) => {
            const {response: {body: {status }}} = res;
            if (status !== 'Completed') {
                cy.wait(`@${alias}`).then(waitPolling);
            }else
                cy.wait(`@${alias}`, { timeout: Cypress.env('global_timeout') }).its('response.statusCode').should('equal', status_esperado)
        }
    }

    static getElement(elementID, pScroll = true){
        if(pScroll)
            return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
        else
            return cy.get(elementID, { timeout: Cypress.env('global_timeout') })
    }

    static requestApiWithBody(ambiente, body = [], method = 'POST') {
        return cy.request({
            method: method,
            url:ambiente,
            failOnStatusCode: false,
            body: body
        })
    }

    static getElementByXPath(element, index = undefined, scrollIntoView = false) {
        let elem;

        if (typeof index !== 'undefined' || index >= 0) {
            if(!scrollIntoView)
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index)
            else
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
        } else {
            if(!scrollIntoView)
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') })
            else
                elem = cy.xpath(element, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
        }

        return elem;
    }

    static selectOption(element, option, index = undefined, scrollIntoView = false) {
        return this.getElement(element, index, scrollIntoView).select(option);
    }

    static getElementText(element, index = undefined) {
        return this.getElement(element, index).should('be.visible').invoke('text')
    }
    //definir o texto através do .then()
    static getElementTextByXpath(element, index = 0, pScroll = undefined) {
        return this.getElementByXPath(element, index).should('be.visible').invoke('text')
    }

    static getElementByIndex(elementID, index = 0){
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView()
    }

    static getElementByContainsText(text, caseSensitive = false){
        return cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: caseSensitive }).scrollIntoView()
    }

    static getElementFilterByFind(elementID, finder){
        return this.getElement(elementID).find(finder, { timeout: Cypress.env('global_timeout') }).scrollIntoView()
    }

    static getElementXpathFilterByFind(elementID, finder){
        return this.getElementByXPath(elementID).find(finder).scrollIntoView()
    }

    static getElementTextByFind(elementID, finder){
        return this.getElement(elementID).find(finder).should('be.visible').invoke('text')
    }

    static getElementFilterByContains(elementID, text){
        return this.getElement(elementID).contains(text).scrollIntoView()
    }

    static getElementFilterByContainsByXpath(elementID, text){
        return this.getElementByXPath(elementID).contains(text).scrollIntoView()
    }

    static getElementFilterByFindAndContains(elementID, finder, text){
        return this.getElement(elementID).find(finder).contains(text).scrollIntoView()
    }

    static getElementLength(elementID, pScroll=false){
        return this.getElement(elementID, pScroll).its('length')
    }

    static getElementLengthByXpath(elementID, pScroll=false, index=undefined){
        return this.getElementByXPath(elementID, index, pScroll).its('length')
    }

    static getElementLengthByFinder(elementID, finder, pScroll=false){
        return this.getElement(elementID, pScroll).find(finder).its('length')
    }

    static getElementLengthByXpathAndFinder(elementID, finder, pScroll=false, index=undefined){
        return this.getElementByXPath(elementID, index, pScroll).find(finder).its('length')
    }

    static getElementAttributeByXpath(elementID, index, attr = 'href') {
        return this.getElementByXPath(elementID, index).invoke('attr', attr)
    }

    static getIframe(elementID){
        return this.getElement(elementID)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    static getIframeByIndex(elementID, index = undefined){
        return this.getElementByIndex(elementID, index)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    static getIframeByXpath(elementID){
        return this.getElementByXPath(elementID)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    static getIframeByIndexAndXpath(elementID, index = undefined){
        return this.getElementByXPath(elementID, index)
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap);
    }

    static getIframeLoaded(elementID){
        cy.frameLoaded(elementID)
    }

    static clickElementInsideIframe(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).get(elementInside).click({force: true})
    }

    static clickElementInsideIframeByXpath(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).xpath(elementInside).click({force: true})
    }

    static validadeElementIsVibileInsideIframe(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).get(elementInside).should('be.visible')
    }

    static validadeElementIsVibileInsideIframeByXpath(elementID, elementInside){
        this.getIframeLoaded(elementID)
        cy.iframe(elementID).xpath(elementInside).should('be.visible')
    }

    static scrollIntoView(elementID){
        this.getElement(elementID).scrollIntoView()
    }

    static scrollToBottomOfElement(elementID){
        this.getElement(elementID).scrollTo('bottom')
    }

    static scrollToTopOfElement(elementID){
        this.getElement(elementID).scrollTo('top')
    }

    static setElementValue(elementID, value){
        this.getElement(elementID).type(value, {force: true});
    }

    static clickElement(elementID){
        return this.getElement(elementID).click({force: true});
    }

    static clickElementByText(elementID){
        this.getElementByContainsText(elementID).click({force: true});
    }

    static clickElementByTextAndXpath(elementID){
        this.getElementByXPath(elementID).click({force: true});
    }

    static clickElementByXpath(elementID, index = undefined){
        return this.getElementByXPath(elementID, index).click({force: true});
    }

    static clickElementByFind(elementID, finder=undefined){
        this.getElementFilterByFind(elementID, finder).click({force: true});
    }

    static clickElementByXpathAndFind(elementID, finder=undefined){
        return this.getElementXpathFilterByFind(elementID, finder).click({force: true});
    }

    static clickElementByXpathAndIndex(elementID, index = 0){
        this.getElementByXPath(elementID, index).click({force: true});
    }

    static clickElementByIndex(elementID, index = 0){
        this.getElementByIndex(elementID, index).click({force: true});
    }

    static clickElementByXpathByIndex(elementID, index = 0, scrollIntoView = undefined){
        this.getElementByXPath(elementID, index, scrollIntoView).click({force: true});
    }

    static clickElementUsingContainsText(text){
        this.getElementByContainsText(text).click({force: true})
    }

    static clickElementCheckBox(element, option, index=undefined, pScroll = true){
        if(index != undefined || index >= 0)
            this.getElementByIndex(element).check(option, { force: true }).should('be.checked')
        else
            this.getElement(element, pScroll).check(option, { force: true }).should('be.checked')
    }

    static clickElementCheckBoxByXpath(element, option, index=undefined. pScroll = true){
        this.getElementByXPath(element, index, pScroll).check(option, { force: true }).should('be.checked')
    }

    static doubleClickElement(elementID){
        return this.getElement(elementID).dblclick({force: true});
    }

    static doubleClickElementByText(elementID){
        this.getElementByContainsText(elementID).dblclick({force: true});
    }

    static doubleClickElementByTextAndXpath(elementID){
        this.getElementByXPath(elementID).dblclick({force: true});
    }

    static doubleClickElementByXpath(elementID){
        return this.getElementByXPath(elementID).dblclick({force: true});
    }

    static doubleClickElementByFind(elementID, finder=undefined){
        this.getElementFilterByFind(elementID, finder).dblclick({force: true});
    }

    static doubleClickElementByXpathAndFind(elementID, finder=undefined){
        return this.getElementXpathFilterByFind(elementID, finder).dblclick({force: true});
    }

    static doubleClickElementByXpathAndIndex(elementID, index = 0){
        this.getElementByXPath(elementID, index).dblclick({force: true});
    }

    static doubleClickElementByIndex(elementID, index = 0){
        this.getElementByIndex(elementID, index).dblclick({force: true});
    }

    static doubleClickElementByXpathByIndex(elementID, index = 0, scrollIntoView = undefined){
        this.getElementByXPath(elementID, index, scrollIntoView).dblclick({force: true});
    }

    static doubleClickElementUsingContainsText(text){
        this.getElementByContainsText(text).dblclick({force: true})
    }

    static hoverElement(elementID){
        return this.getElement(elementID).trigger("mouseover")
    }

    static hoverElementByXpath(elementID){
        return this.getElementByXPath(elementID).trigger("mouseover")
    }

    static mouseEnterElement(elementID){
        this.getElement(elementID).trigger("mouseenter")
    }

    static mouseEnterElementByXpath(elementID){
        this.getElementByXPath(elementID).trigger("mouseenter")
    }

    static elementForceShow(elementID){
        return this.getElement(elementID).invoke("show")
    }

    static elementForceShowByXpath(elementID){
        return this.getElementByXPath(elementID).invoke("show")
    }

    static elementChangeAttribute(elementLink, attr, value){
        this.getElement(elementLink)
            .invoke('attr', attr, value)
            .should('have.attr', attr, value)
    }

    static elementChangeAttributeByXpath(elementLink, attr, value){
        this.getElementByXPath(elementLink)
            .invoke('attr', attr, value)
            .should('have.attr', attr, value)
    }
    
    static typeElement(elementID, text, opt_delay=10){
        this.getElement(elementID).type(text, { force: true, delay: opt_delay});
    }

    static typeElementByFind(elementID, finder = undefined){
        this.getElementFilterByFind(elementID, finder).type(text, { force: true });
    }

    static typeElementByIndex(elementID, text, index = undefined){
        this.getElementByIndex(elementID, index).type(text, { force: true });
    }

    static typeElementByXpathAndIndex(elementID, text, index = undefined){
        this.getElementByXPath(elementID, index).type(text, { force: true });
    }

    static typeElementByXpath(elementID, text){
        this.getElementByXPath(elementID).type(text, { force: true });
    }

    static clearElementInput(elementID){
        this.getElement(elementID).clear()
    }

    static clearElementInputByIndex(elementID, index = undefined){
        this.getElementByIndex(elementID,index).clear()
    }

    static validateUrlPartialEndpoint(endpoint){
        cy.url({ timeout: Cypress.env('global_timeout')}).should('include', endpoint)
    }

    static validateImgIsVisible(elementID){
        this.getElement(elementID)
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0)
                expect($img[0].naturalHeight).to.be.greaterThan(0)
            })
    }

    static validateElementIsVisible(elementID){
        this.getElement(elementID).should('be.visible')
    }

    static validateElementIsVisibleByXpath(elementID, index = undefined){
        this.getElementByXPath(elementID, index).should('be.visible')
    }

    static validateElementIsVisibleByText(elementID){
        this.getElementByContainsText(elementID).should('be.visible')
    }

    static validateElementIsNotEmpty(elementID){
        this.getElement(elementID).should('to.be.not.empty')
    }

    static validateElementIsEmpty(elementID){
        this.getElement(elementID).should('to.be.empty')
    }

    static validateElementTextIsNotEmpty(elementID){
        this.getElement(elementID).invoke('val').then(($el) => {
            expect($el, { timeout: Cypress.env('global_timeout') }).should('to.be.not.empty')
        })
    }

    static validateElementText(elementID, text){
        this.getElement(elementID).should('have.text', text)
    }

    static validateElementTextByXpath(elementID, text){
        this.getElementByXPath(elementID).should('have.text', text)
    }

    static validateElementInnerText(elementID, text){
        this.getElement(elementID).should('have.text', text)
    }

    static validateElementContainInnerText(elementID, text){
        this.getElement(elementID).should('contain.text', text)
    }

    static validateElementByXpathAndInnerText(elementID, text, index = 0){
        this.getElementByXPath(elementID, index).should('have.text', text)
    }

    
    static validateElementTextByXpathAndIndex(elementID, text, index = 0){
        this.getElementByXPath(elementID, index).should('contain.text', text)
    }

    static validateElementByXpathContainInnerText(elementID, text, index = 0){
        this.getElementByXPath(elementID, index).should('contain.text', text)
    }

    static validateCheckBoxIsChecked(element, index = undefined, scrollIntoView = false){
        this.getElement(element, index, scrollIntoView).should('be.checked')
    }

    static validateCheckBoxIsNotChecked(element, index = undefined, scrollIntoView = false){
        this.getElement(element, index, scrollIntoView).should('be.not.checked')
    }

    static validateElementLengthWithoutScroll(elementID, value, option = ""){
        switch(option){
            case ">=": this.getElement(elementID, false).children().should('have.length.gte', value); break;
            case "<=": this.getElement(elementID, false).children().should('have.length.lte', value); break;
            default: this.getElement(elementID, false).children().should('have.length', value);break;
        }
    }

    static validateElementLengthByChildren(elementID, value, option = ""){
        switch(option){
            case ">=": this.getElement(elementID).children().should('have.length.gte', value); break;
            case "<=": this.getElement(elementID).children().should('have.length.lte', value); break;
            default: this.getElement(elementID).children().should('have.length', value);break;
        }
    }

    static validateElementLengthByChildrenByXpath(elementID, value, option = ""){
        switch(option){
            case ">=": this.getElementByXPath(elementID).children().should('have.length.gte', value); break;
            case "<=": this.getElementByXPath(elementID).children().should('have.length.lte', value); break;
            default: this.getElementByXPath(elementID).children().should('have.length', value);break;
        }
    }
    static validateElementLengthByXpath(elementID, value, option = ""){
        switch(option){
            case ">=": this.getElementByXPath(elementID).should('have.length.gte', value); break;
            case "<=": this.getElementByXPath(elementID).should('have.length.lte', value); break;
            default: this.getElementByXPath(elementID).should('have.length', value);break;
        }
    }

    static validateElementVal(elementID, texto, index = undefined, scrollIntoView = false){
        this.getElement(elementID, index, scrollIntoView).invoke('val').then(($el) => {
            expect($el, { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementValByXpath(elementID, texto, index = undefined, scrollIntoView = false){
        this.getElementByXPath(elementID, index, scrollIntoView).invoke('val').then(($el) => {
            expect($el, { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementTextByInvokeText(elementID, texto){
        this.getElement(elementID).invoke('text').then(($el) => {
            expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementTextByXpathAndInvokeText(elementID, texto){
        this.getElementByXPath(elementID).invoke('text').then(($el) => {
            expect($el.trim(), { timeout: Cypress.env('global_timeout') }).contains(texto)
        })
    }

    static validateElementLink(elementLinkID){
        this.getElement(elementLinkID).should('have.attr', 'href')
    }

    static validateElementLinkByText(elementLinkID){
        this.getElementByContainsText(elementLinkID).should('have.attr', 'href')
    }

    static validateLinkAttrHREF(elementLinkID, path){
        this.getElement(elementLinkID).should('have.attr', 'href').and('include', path)
    }

    static validateLinkAttrHREFbyXpath(elementLinkID, path){
        this.getElementByXPath(elementLinkID).should('have.attr', 'href').and('include', path)
    }

    static validateLinkAttrHREFbyTextLink(elementLinkText, path){
        this.getElementByContainsText(elementLinkText).should('have.attr', 'href').and('include', path)
    }

    static validatePageContainsText(text){
        cy.contains(text, { timeout: Cypress.env('global_timeout')}).scrollIntoView().should('be.visible')
    }

    static validatePageNotContainsText(text){
        //elemento existe no DOM mas que não deve estar visível
        cy.contains(text, { timeout: Cypress.env('global_timeout')}).should('not.be.visible')
    }

    static validateTextExistOnPage(text){
        cy.contains(text, { timeout: Cypress.env('global_timeout')}).should('exist')
    }

    static validateTextNotExistOnPage(text){
        //elemento não deve existir no DOM
        cy.contains(text, { timeout: Cypress.env('global_timeout')}).should('not.exist')
    }

    static validateElementIsDisabled(selector){
        this.getElement(selector).should('be.disabled')
    }
    static validateElementIsDisabledByXpath(selector){
        this.getElementByXPath(selector).should('be.disabled')
    }

    static validateRequestStatusCode(response_request, expectCode, prop1 = undefined, prop2 = undefined, prop3 = undefined){
        if(prop1)
            expect(response_request.body).to.have.property(prop1).and.to.be.not.empty
        if(prop2)
            expect(response_request.body).to.have.property(prop2).and.to.be.not.empty
        if(prop3)
            expect(response_request.body).to.have.property(prop3).and.to.be.not.empty

        expect(response_request.status).to.be.eq(expectCode)
    }

    static validatePlaceholder(element, placeholder){
        this.getElement(element).should("have.attr", "placeholder", placeholder)
    }

    static getElementByXpathInvoke(elementID){
        return this.getElementByXPath(elementID).invoke("text")
    }

    static validateElementHaveTextByXpath(element, text) {
        this.getElementByXPath(element).should("have.text", text)
    }

    static validateElementContainsTextByXpath(element, text) {
        this.getElementByXPath(element).should("contains", text)
    }

    static validateElementByXpathValue(element, value){
        this.getElementByXPath(element).should("have.value", value)
    }

    static validateElementHaveValue(element, value){
        this.getElement(element).should("have.value", value)
    }

    static validateValueBoolean(element, boolean){
        this.getElementByXPath(element).should("have.attr", "aria-current", boolean)
    }

    static validateElementIsEnable(element){
        this.getElement(element).should("be.enabled")
    }

    static validateElementIsNotEnable(element){
        this.getElement(element).should("be.disabled")
    }

    static validateElementIsEnableByXpath(element, index = 0){
        this.getElementByXPath(element, index).should("be.enabled")
    }

    static validateElementIsNotEnableByXpath(element, index = 0){
        this.getElementByXPath(element, index).should("be.disabled")
    }

    static typeAndBlurElement(element, text){
        this.getElement(element).type(text).blur()
    }

    static clearElementAndType(element, text){
        this.clearElementInput(element)
        this.typeElement(element, text)
    }
    
    static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method,
            url: endpoint,
            body: body,
            headers: headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')){
        return cy.request({
            method: method,
            url: endpoint,
            headers : headers,
            failOnStatusCode: failOnStatusCode,
            timeout: timeout,
            qs : qs
        })
    }

    static validateURLStatus(method = 'GET', ambiente, status = 200) {
        cy.request({
            method: method,
            url:ambiente,
            failOnStatusCode: false
        }).then((res) => {
            expect(res).to.have.deep.property('status', status)
        })
    }

    static extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
    }
}

