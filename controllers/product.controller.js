const Product = require('../models/product.model');

exports.test = (req,res)=>{
	res.send('Greetings frm rouete');
}

exports.product_create = (req,res)=>{
	let product = new Product(
		{
			name: req.body.name,
			price: req.body.price
		}
	);
	product.save((err)=>{
		if (err){
			return next(err);
		}
		res.send('Product created');
	});
}

exports.product_details = (req,res)=>{
	Product.findById(req.params.id, (err,product)=>{
		if (err) return next (err);
		res.send(product);
	})
}

exports.product_update = (req,res)=>{
	Product.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, product)=>{
		if (err) return next(err);
		res.send('Product Updated');
	});
}

exports.product_delete = (req,res)=>{
	Product.findByIdAndDelete(req.params.id, (err)=>{
		if (err) return next(err);
		res.send('Deleted Succesful');
	});
}