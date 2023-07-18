

export default async function PageRoute({ params }: { params: { slug: string, lang: string } }) {

    return (
        <div className="card card-bordered flex-shrink-0 w-full mx-auto max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="card-title mx-auto" >注册</h2>
                <div className="divider"></div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">邮箱</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">密码</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">忘记密码?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
    )
}
