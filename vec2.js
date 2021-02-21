const PI = Math.PI;


class Vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    mag() {
        return Vec2.mag(this);
    }

    normalize() {
        this.div(this.mag());
        return this;
    }

    setMag(scalar) {
        this.normalize();
        this.mult(scalar);
        return this;
    }

    rotate(radian) {
        this.set(
            this.x * Math.cos(radian) - this.y * Math.sin(radian),
            this.x * Math.sin(radian) + this.y * Math.cos(radian)
        );
        return this;
    }

    angle(vec) {
        return Vec2.angle(this, vec);
    }

    static add(vec1, vec2) {
        return new Vec2(0, 0)
            .add(vec1)
            .add(vec2);
    }

    static sub(vec1, vec2) {
        return new Vec2(0, 0)
            .add(vec1)
            .sub(vec2);
    }

    static mult(vec, scalar) {
        return new Vec2(0, 0)
            .add(vec)
            .mult(scalar);
    }

    static div(vec, scalar) {
        return new Vec2(0, 0)
            .add(vec)
            .div(scalar);
    }

    static mag(vec) {
        return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }

    static dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    static angle(vec1, vec2) {
        return Math.acos(Vec2.dot(vec1, vec2) / (Vec2.mag(vec1) * Vec2.mag(vec2)));

    }
}