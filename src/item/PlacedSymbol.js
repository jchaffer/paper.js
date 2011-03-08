/*
 * Paper.js
 *
 * This file is part of Paper.js, a JavaScript Vector Graphics Library,
 * based on Scriptographer.org and designed to be largely API compatible.
 * http://paperjs.org/
 * http://scriptographer.org/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * Copyright (c) 2011, Juerg Lehni & Jonathan Puckey
 * http://lehni.org/ & http://jonathanpuckey.com/
 *
 * All rights reserved.
 */

var PlacedSymbol = this.PlacedSymbol = Item.extend({
	beans: true,

	initialize: function(symbol, matrixOrOffset) {
		this.base();
		if (symbol instanceof Symbol) {
			this.symbol = symbol;
		} else {
			this.symbol = new Symbol(symbol);
		}
		if (matrixOrOffset !== undefined) {
			if (matrixOrOffset instanceof Matrix) {
				this.matrix = matrixOrOffset;
			} else {
				this.matrix = new Matrix().translate(Point.read(arguments, 1));
			}
		} else {
			this.matrix = new Matrix();
		}
	},

	_transform: function(matrix, flags) {
		// In order to set the right context transformation when drawing the
		// raster, simply preconcatenate the internal matrix with the provided
		// one.
		this.matrix.preConcatenate(matrix);
	},

	getBounds: function() {
		return this.symbol._definition.getStrokeBounds(this.matrix);
	},

	getStrokeBounds: function() {
		return this.getBounds();
	},

	draw: function(ctx, param) {
		// TODO: we need to preserve strokewidth
		ctx.save();
		this.matrix.applyToContext(ctx);
		Item.draw(this.symbol.getDefinition(), ctx, param);
		ctx.restore();
	}

	// TODO:
	// embed()
});
