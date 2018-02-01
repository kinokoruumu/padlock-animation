import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

class TransformUtil {

	constructor(matrix) {
		this.matrix = matrix || MatrixMath.createIdentityMatrix();
	}

	perpective(x) {
		MatrixMath.reusePerspectiveCommand(this.matrix, x)

		return this;
	}

	translate(x = 0,y = 0,z = 0) {
		MatrixMath.reuseTranslate3dCommand(this.matrix, x,y,z)

		return this;
	}

	scale(x = 0,y = 0,z = 0) {
		if (!y && !z) {
			y = x;
			z = x;
		}
		MatrixMath.reuseScale3dCommand(this.matrix, x,y,z);

		return this;
	}

	rotate(x = 0, y = 0, z = 0) {
		MatrixMath.reuseRotateXCommand(this.matrix, (Math.PI / 180) * x);
		MatrixMath.reuseRotateYCommand(this.matrix, (Math.PI / 180) * y);
		MatrixMath.reuseRotateZCommand(this.matrix, (Math.PI / 180) * z);

		return this;
	}

	skew(x = 0, y = 0) {
		MatrixMath.reuseSkewXCommand(this.matrix, (Math.PI / 180) * x);
		MatrixMath.reuseSkewYCommand(this.matrix, (Math.PI / 180) * y);

		return this;
	}

	origin(x = 0, y = 0, z = 0) {
		const translate = MatrixMath.createIdentityMatrix();
		MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
		MatrixMath.multiplyInto(this.matrix, translate, this.matrix);

		const untranslate = MatrixMath.createIdentityMatrix();
		MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
		MatrixMath.multiplyInto(this.matrix, this.matrix, untranslate);

		return this;
	}
}

export function transform(matrix) {
	return new TransformUtil();
}