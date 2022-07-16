module.exports={    
    foundTitle: async function(page, link, text) {
                try {        
                    await page.goto(link);
                    const title2 = await page.title();
                    expect(title2).toEqual(text);
                } catch (error) {        
                    throw new Error(`Selector not found: ${text}`)
                }    }}