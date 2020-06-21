const { Router } = require('express');
const router = Router();
const Wallet = require('../models/walletsModel');

router.get('/', async (req, res) => {
    const wallets = await Wallet.find();
    
    res.json(wallets);
});

router.get('/:id', async (req, res) => {
    const wallets = await Wallet.findById(req.params.id);
    
    res.json(wallets);
});

router.post('/', async (req, res) => {
    const { name, budget } = req.body;
    const newWallet = new Wallet({ name, budget })
    
    await newWallet.save();
    res.json({ message: 'saved' });
});

router.delete('/:id', async (req, res) => {
    const wallet = await Wallet.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'deleted' });
});

router.patch('/:id', async (req, res) => {
    const { name, budget } = req.body;
    console.log("patch wallet")
    let wallet = await Wallet.findByIdAndUpdate(req.params.id, {name, budget});
    
    await wallet.save();
    res.send('updated');
});

router.post('/:id/transactions', async (req, res) => {
    const { title, amount, type } = req.body;
    let wallet = await Wallet.findById(req.params.id);
    wallet.transactions.push({ title, amount, type });
    await wallet.save();
    res.json(wallet);
});

router.delete('/:id/transactions/:idt', async (req, res) => {
    const wallet = await Wallet.findById(req.params.id);
    wallet.transactions.pull({ _id: req.params.idt });
    await wallet.save();
    res.json({ message: 'deleted' });
});

module.exports = router;