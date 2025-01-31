import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TwitterNav, { HighlightUrl } from "@/components/TwitterNav"

export default function Messages() {
    return (
        <div className="flex">
            <TwitterNav highlight={HighlightUrl.Messages}/>

            <div className="flex">
                <div>
                    <h1 className="inline text-2xl font-bold">Messages</h1>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} className={"float-end"}/>
                </div>

            </div>

        </div>
    )

}