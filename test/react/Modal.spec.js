import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import Modal from '../../src/components/Modal';

// jsdom has HTMLDialogElement but neither show()/showModal() nor close(). Like a browser,
// opening a disconnected dialog throws and close fires its close event asynchronously.
const dialogProto = window.HTMLDialogElement.prototype;
beforeAll(() => {
	Object.defineProperty(dialogProto, 'open', {
		configurable: true,
		get() { return this.hasAttribute('open'); }
	});
	const open = function() {
		if (!document.body.contains(this)) {
			throw new Error('InvalidStateError');
		}
		this.setAttribute('open', '');
	};
	dialogProto.showModal = open;
	dialogProto.show = open;
	dialogProto.close = function() {
		this.removeAttribute('open');
		setTimeout(() => this.dispatchEvent(new Event('close')), 0);
	};
});

const tick = () => new Promise(resolve => setTimeout(resolve, 5));

describe('Modal', () => {

	const MODAL_MESSAGE = 'Message';
	test('standard modal', ()=>{
		const modal = new ReactWrapper(mount(<Modal show={true} size='small'>
								<Modal.Header><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
								<Modal.Body>
									{MODAL_MESSAGE}
								</Modal.Body>
								<Modal.Footer actionButtonText='Yes' actionButtonClick={()=>{}}/>
							</Modal>).instance().modalRef, true);

		expect(modal.find(Modal.Body).length).toBe(1);                                                                               
		expect(modal.find(Modal.Header).length).toBe(1);                                                                               
		expect(modal.find(Modal.Title).length).toBe(1);   
		expect(modal.find(Modal.Body).length).toBe(1);              
		expect(modal.find(Modal.Footer).length).toBe(1); 
		expect(modal.find(Modal.Header).props().type).toBe('info');
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.html()).toMatchSnapshot();
	});
	
	test('standard modal - not displayed', ()=>{
		const modal = new ReactWrapper(mount(<Modal show={false} size='small'>
								<Modal.Header><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
								<Modal.Body>
									 {MODAL_MESSAGE}	
								</Modal.Body>
								<Modal.Footer actionButtonText='Yes' actionButtonClick={()=>{}}/>
							</Modal>).instance().modalRef, true);		
		expect(modal.find(Modal.Body).length).toBe(0);
		expect(modal.html()).toMatchSnapshot();        
	});
	
	test('alert modal', ()=>{
		const modal = new ReactWrapper(mount(
			<Modal show type='alert' size='small'>
				<Modal.Header type='alert'><Modal.Title>Title</Modal.Title></Modal.Header>
				<Modal.Body>
					{MODAL_MESSAGE}
				</Modal.Body>
				<Modal.Footer closeButtonText='Ok'/>
		</Modal>).instance().modalRef, true);
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.find('.sdc-modal-type-alert').length).toBe(1);
		expect(modal.html()).toMatchSnapshot();
	});
	
	test('custom modal', ()=>{
		const modal = new ReactWrapper(mount(
			<Modal show type='custom'>
				<Modal.Header type='custom'><Modal.Title>Title</Modal.Title></Modal.Header>
				<Modal.Body>
					{MODAL_MESSAGE}
				</Modal.Body>
				<Modal.Footer  actionButtonText='Ok' actionButtonClick={()=>{}}/>
			</Modal>).instance().modalRef, true);
		expect(modal.find(Modal.Body).text()).toBe(MODAL_MESSAGE);
		expect(modal.find('.sdc-modal-type-custom').length).toBe(1);
		expect(modal.html()).toMatchSnapshot();
	});

});

describe('Modal - native dialog', () => {
	let showModal, show, close;
	beforeEach(() => {
		showModal = jest.spyOn(dialogProto, 'showModal');
		show = jest.spyOn(dialogProto, 'show');
		close = jest.spyOn(dialogProto, 'close');
	});
	afterEach(() => {
		showModal.mockRestore();
		show.mockRestore();
		close.mockRestore();
	});

	test('a shown modal is a modal <dialog> labelled by its title', () => {
		const modal = mount(<Modal show size='small'>
			<Modal.Header onClose={() => {}}><Modal.Title>Standard Modal</Modal.Title></Modal.Header>
			<Modal.Body>body</Modal.Body>
		</Modal>);
		const dialog = modal.instance().dialogRef;
		expect(dialog.tagName).toBe('DIALOG');
		expect(dialog.className).toBe('sdc-modal sm');
		expect(dialog.open).toBe(true);
		expect(showModal).toHaveBeenCalledTimes(1);
		expect(dialog.hasAttribute('role')).toBe(false);
		expect(dialog.hasAttribute('aria-modal')).toBe(false);
		expect(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent).toBe('Standard Modal');
		modal.unmount();
	});

	test('without a title the dialog has no aria-labelledby', () => {
		const modal = mount(<Modal show><Modal.Body>body</Modal.Body></Modal>);
		expect(modal.instance().dialogRef.hasAttribute('aria-labelledby')).toBe(false);
		modal.unmount();
	});

	test('a hidden modal renders no dialog at all', () => {
		const modal = mount(<Modal show={false}><Modal.Body>body</Modal.Body></Modal>);
		expect(modal.instance().modalRef.querySelector('dialog')).toBeNull();
		expect(showModal).not.toHaveBeenCalled();
		modal.unmount();
	});

	test('the show prop opens the dialog and closes and removes it', () => {
		const modal = mount(<Modal show={false}><Modal.Body>body</Modal.Body></Modal>);
		const root = modal.instance().modalRef;
		modal.setProps({show: true});
		const dialog = root.querySelector('dialog');
		expect(dialog.open).toBe(true);
		expect(showModal).toHaveBeenCalledTimes(1);
		modal.setProps({show: false});
		expect(close).toHaveBeenCalledTimes(1);
		expect(dialog.open).toBe(false);
		expect(root.querySelector('dialog')).toBeNull();
		modal.unmount();
	});

	test('modal={false} opens a non-modal dialog', () => {
		const modal = mount(<Modal show modal={false}><Modal.Body>body</Modal.Body></Modal>);
		expect(show).toHaveBeenCalledTimes(1);
		expect(showModal).not.toHaveBeenCalled();
		expect(modal.instance().dialogRef.open).toBe(true);
		modal.unmount();
	});

	test('Escape asks onClose to close and leaves visibility to the show prop', () => {
		const onClose = jest.fn();
		const modal = mount(<Modal show onClose={onClose}><Modal.Body>body</Modal.Body></Modal>);
		const dialog = modal.instance().dialogRef;
		const cancel = new Event('cancel', {cancelable: true});
		dialog.dispatchEvent(cancel);
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(cancel.defaultPrevented).toBe(true);
		expect(dialog.open).toBe(true);
		modal.unmount();
	});

	test('a dialog the browser closed while show is true is reopened', () => {
		const modal = mount(<Modal show><Modal.Body>body</Modal.Body></Modal>);
		const dialog = modal.instance().dialogRef;
		dialog.removeAttribute('open');
		dialog.dispatchEvent(new Event('close'));
		expect(dialog.open).toBe(true);
		expect(showModal).toHaveBeenCalledTimes(2);
		modal.unmount();
	});

	test('unmounting an open modal closes the dialog without reopening it', async () => {
		const onError = jest.fn();
		window.addEventListener('error', onError);
		const modal = mount(<Modal show><Modal.Body>body</Modal.Body></Modal>);
		modal.unmount();
		expect(close).toHaveBeenCalledTimes(1);
		await tick();
		expect(showModal).toHaveBeenCalledTimes(1);
		expect(onError).not.toHaveBeenCalled();
		window.removeEventListener('error', onError);
	});

	test('hiding the modal does not reopen it when the close event arrives', async () => {
		const modal = mount(<Modal show><Modal.Body>body</Modal.Body></Modal>);
		modal.setProps({show: false});
		await tick();
		expect(showModal).toHaveBeenCalledTimes(1);
		modal.unmount();
	});
});
