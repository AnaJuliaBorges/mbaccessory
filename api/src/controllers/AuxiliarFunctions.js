module.export = {

    async findLegend (category) {
    
        let initialCode;
                const findLegend = await Legend.find({ name: category });
        
                if (!findLegend.length)
                    return res.status(400).json({ error: 'Categoria não encontrada' });
}
}
